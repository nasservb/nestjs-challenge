export const rabbitmqWrapper = {
  channel: {
    sendToQueue: jest
      .fn()
      .mockImplementation(
        (queue: string, data: any) => {
        }
      ),
  },
  connection: {
    disconnect: jest
      .fn()
      .mockImplementation(
        () => {
        }
      ),
  },
  connect : ()=>{}
};
