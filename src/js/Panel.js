function Panel(id, broker, params)
{
  // Extends
  PubSub.apply(this, arguments);

  this.id = id;
  this.broker = broker;
  this.params = params;

}
