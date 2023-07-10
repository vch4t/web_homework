import message from "./Message";

var objectStore;
var storeName="storeName";
var indexName="title"
const indexDb={
    db:null,
    //打开数据库
    openDB:function(dbName='MyBBS', version = 1) {
        return new Promise((resolve, reject) => {
            //  兼容浏览器
            var indexedDB =
              window.indexedDB ||
              window.mozIndexedDB ||
              window.webkitIndexedDB ||
              window.msIndexedDB;
            let mdb;
            // 打开数据库，若没有则会创建
            const request = indexedDB.open(dbName, version);
            // 数据库打开成功回调
            request.onsuccess = function (event) {
              mdb = event.target.result; // 数据库对象
              resolve(mdb);
            };
            // 数据库打开失败的回调
            request.onerror = function (event) {
              message.error("数据库打开报错");
            };
            // 数据库有更新时候的回调
            request.onupgradeneeded = function (event) {
              // 数据库创建或升级的时候会触发
              mdb = event.target.result; // 数据库对象
              // 创建存储库
              objectStore = mdb.createObjectStore(storeName, {
                keyPath: "id"
              });
              // 创建索引，在后面查询数据的时候可以根据索引查
              objectStore.createIndex("title", "title", { unique: false }); 
            };
          });
      },
      //插入或更新数据
      updateDB:function(data) {
        var request = this.db
          .transaction([storeName], "readwrite") // 事务对象
          .objectStore(storeName) // 仓库对象
          .put(data);
          request.onsuccess=function(){
            //保存最大size
            let cnt=JSON.parse(localStorage.getItem('idbsize'));
            cnt=cnt===null?0:cnt;
            cnt++;
            localStorage.setItem("idbsize",JSON.stringify(cnt));
          }
        request.onerror = function () {
          message.error("数据更新失败");
        };
      },
      //得到所有对象
      getAllDB:function () {
        return new Promise((resolve, reject) => {
        var request = this.db
          .transaction([storeName], "readwrite") // 事务对象
          .objectStore(storeName) // 仓库对象
          .getAll();

          request.onsuccess = function (e) {
              resolve(e.target.result);
          }
        });
      },
      //通过主键获得数据
      getByKey:function (key) {
        return new Promise((resolve, reject) => {
          var request = this.db
          .transaction(storeName, "readwrite") // 事务对象
          .objectStore(storeName) // 仓库对象
          .get(key);
      
          request.onerror = function (event) {
            message.error("事务失败");
          };
      
          request.onsuccess = function (event) {
            resolve(request.result);
          };
        })
      },
      //通过主键删除
      deleteByKey:function (id) {
        return new Promise((resolve, reject) => {
        var request = this.db
          .transaction([storeName], "readwrite")
          .objectStore(storeName)
          .delete(id);
      
        request.onsuccess = function () {
          message.success("数据删除成功！")
          resolve(id);
        };
      
        request.onerror = function () {
          message.error("数据删除失败");
        };
      })
      },
      //分页获取文章
      getAllByPage:function(
        page,
        pageSize) 
        {
        return new Promise((resolve, reject) => {
        let list = [];
        let counter = 0; // 计数器
        let advanced = true; // 是否跳过多少条查询

        let upper=JSON.parse(localStorage.getItem('idbsize'));
        upper=upper===null?1:upper+1;

        var store = this.db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
        var request = store.openCursor(IDBKeyRange.upperBound(upper,true),'prev'); // 指针对象
        request.onsuccess = function (e) {
          var cursor = e.target.result;
          if (page > 1 && advanced) {
            advanced = false;
            cursor.advance((page - 1) * pageSize); // 跳过多少条
            return;
          }
          if (cursor) {
            // 必须要检查
            list.push(cursor.value);
            counter++;
            if (counter < pageSize) {
              cursor.continue(); // 遍历了存储对象中的所有内容
            } 
            else {
              cursor = null;
              resolve(list);
            }
          } else {
            resolve(list);
          }
        };
        request.onerror = function (e) {};
      })
    }
}

export default indexDb;