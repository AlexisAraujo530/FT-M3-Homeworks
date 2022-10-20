'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise{
    constructor(executor){
        if (typeof executor !== "function")
            throw TypeError("executor must be a function");
     this._state = "pending";
     this._value = undefined;
     this._handlerGroups = [];

     const callHanders = (value) => {
        while (this._handlerGroups.length > 0) {
        const { successCb, errorCb, downstreamPromise } =
         this._handlerGroups.shift();

        if(this._state === "fulfilled"){
            if(!successCb) downstreamPromise._internalResolve(value);
            else{
                try{
                    const result = successCb(value);
                if(result instanceof $Promise){
                    result.then(
                        (value) =>downstreamPromise._internalResolve(value),
                        (err) => downstreamPromise._internalReject(err)
                        );
                }else{
                    downstreamPromise._internalResolve(result);
                }
                    } catch (error) {
                        downstreamPromise._internalReject(error);
                    }
            }
        }
        if(this._state === "rejected"){
            if(!errorCb) downstreamPromise._internalReject(value);
            else{
                try{
                    const result = errorCb(value);
                if(result instanceof $Promise){
                    result.then(
                        (value) =>downstreamPromise._internalResolve(value),
                        (err) => downstreamPromise._internalReject(err)
                        );
                }else{
                    downstreamPromise._internalResolve(result);
                }
                    } catch (error) {
                        downstreamPromise._internalReject(error);
                    }
            }
        }
        }
    };

     this._internalResolve = (value) => {
        if(this._state !== "pending") return;
            this._state = "fulfilled";
            this._value = value;
            callHanders(this._value);
     };

     this._internalReject = (reason) => {
        if(this._state !== "pending") return;
            this._state = "rejected";
            this._value = reason;
            callHanders(this._value);
     };
    const resolve = (value) => {
        this._internalResolve(value);
    };
    const reject = (reason) => {
        this._internalReject(reason);
    };
    executor(resolve, reject);

    this.then = (successHandler, errorHandler) => {
        const downstreamPromise = new $Promise((resolve, reject) => {}); 
        const handlerGroup = {
            successCb: typeof successHandler === "function" ? successHandler : false,
            errorCb: typeof errorHandler === "function" ? errorHandler : false,
            downstreamPromise,
        };
        this._handlerGroups.push(handlerGroup);
        this._state !== "pending" && callHanders(this._value);
        return downstreamPromise;
    };
    this.catch = (errorHandler) => {
       return this.then(null, errorHandler);
    }
  }

    static resolve(value){
        if(value instanceof $Promise) return value;
        const newPromise = new $Promise((resolve, reject) => {});
        newPromise._internalResolve(value);
        return newPromise;
    }
    

    static all(arr){
        if(!Array.isArray(arr)) throw TypeError("all must be an array");
        const newPromise = new $Promise((resolve, reject) => {});
        const results = [];
        let counter = 0;
        arr.forEach((item, index) => {
            $Promise.resolve(item).then((value) => {
                results[index] = value;
                counter++;
                if(counter === arr.length) newPromise._internalResolve(results);
            }, (err) => {
                newPromise._internalReject(err);
            });
        });
        return newPromise;
    }
   
}
    





module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
