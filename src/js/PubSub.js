function PubSub()
{

  this.subscribers = {};

  this.publish = function (event, args) {
    if (!this.subscribers[event])
      return false;
    this.subscribers[event].forEach(function (subscriber) {
      subscriber.apply(this, args)
    });
    return true;
  };

  this.subscribe = function (event, callback) {
    if (!this.subscribers[event])
      this.subscribers[event] = [];
    this.subscribers[event].push(callback);
  };

}


