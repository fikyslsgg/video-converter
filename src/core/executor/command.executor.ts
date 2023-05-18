import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream-logger.interface.js';
import { ICommandExec } from './command.types.js';
import { ICommandExecFfmpeg } from '../../commands/ffmpeg/ffmpeg.types.js';

export abstract class CommandExecuter<Input>{
  constructor(private logger: IStreamLogger) {
  }

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processStream(stream, this.logger);
  }
  protected abstract prompt(): Promise<Input>
  protected abstract build(input: Input): ICommandExecFfmpeg;
  protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
  protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}