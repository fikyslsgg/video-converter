export class StreamHandler {
    constructor(logger) {
        this.logger = logger;
    }
    peocessOutput(stream) {
        stream.stdout.on('data', (data) => {
            this.logger.log(data.toString());
        });
        stream.stderr.on('data', (data) => {
            this.logger.error(data);
        });
        stream.on('close', () => {
            this.logger.end();
        });
    }
}
