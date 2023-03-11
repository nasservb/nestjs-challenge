import amqplib, { Channel, Connection } from 'amqplib';

class RabbitmqWrapper {
  private _channel?: Channel;
  private _connection?: Connection;

  get channel() {
    if (!this._channel) {
      throw new Error('Cannot access Rabbitmq client before connecting');
    }

    return this._channel;
  }

  get connection() {
    if (!this._connection) {
      throw new Error('Cannot access Rabbitmq client before connecting');
    }

    return this._connection;
  }

  async connect() {
    try {
      this._connection = await amqplib.connect(process.env.RABBITMQ_SERVER);
      this._channel = await this._connection.createChannel();
      await this._channel.assertQueue(process.env.RABBITMQ_QUEUE_NAME);
      console.log('RabbitMQ connected');
    } catch (error) {
      process.exit(1);
    }
  }
}

export const rabbitmqWrapper = new RabbitmqWrapper();
