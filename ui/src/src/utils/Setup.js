import Configuration from '../conf/Configuration';
import Logger from './Logger';
//import HttpArgParser from './HttpArgParser';

export class Setup {
  static Run(){
    console.log('executing setup :)')
    Configuration.Init()
    Logger.Init()
  }
}

export default Setup;