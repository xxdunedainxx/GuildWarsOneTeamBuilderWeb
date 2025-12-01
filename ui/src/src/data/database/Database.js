import Configuration from '../../conf/Configuration';
import Logger from '../../utils/Logger';
import * as rawDbFile from './db.json';
import GwClass from '../models/GwClass';
import GwSkill from '../models/GwSkill';

export class Database {
  
  static databaseData = {}
  static rawDb = {}
  // used for indexing/searching skills by name later 
  static skillNames = []

  static InitializeDBInJSMem(){
    Logger.info('Initializing DB')
    Database.rawDb = rawDbFile
    console.log(Database.rawDb)
    Database.SerializeDBIntoObject()
  }

  // Converts the JSON db into a structured db 
  // todo -- might be memory intensive, if so might just rely on parsing the JSON DB 
  static SerializeDBIntoObject() {
  	Logger.info("Serialize json DB into structured db")
  	Database.SerializeClassSkills(GwClass.Warrior)
  	Database.SerializeClassSkills(GwClass.Ranger)
  	Database.SerializeClassSkills(GwClass.Monk)
  	Database.SerializeClassSkills(GwClass.Necromancer)
  	Database.SerializeClassSkills(GwClass.Mesmer)
  	Database.SerializeClassSkills(GwClass.Elementalist)
  	Database.SerializeClassSkills(GwClass.Assassin)
  	Database.SerializeClassSkills(GwClass.Ritualist)
  	Database.SerializeClassSkills(GwClass.Paragon)
  	Database.SerializeClassSkills(GwClass.Dervish)



  	Logger.info("===== SKILL NAMES =====")
  	console.log(Database.skillNames)
  	Logger.info("===== SKILL DB ======")
  	console.log(Database.databaseData)

  }

  static SerializeClassSkills(clazz){
  	Logger.info(`Serializing class '${clazz}'`)

  	let clazzSkills = Database.rawDb[clazz]
  	//Logger.info(`${clazzSkills}`)
  	Database.databaseData[clazz] = {}

	for (let i = 0; i < clazzSkills.length; i++) {
	  //console.log(clazzSkills[i]);
	  /*
	  		this.skillIconLocation = skillIconLocation
			this.name = name
			this.description = description
			this.energy = energy
			this.activationTime = activationTime
			this.rechargeTime = rechargeTime
			this.attribute = attribute
			this.campaign = campaign
			this.clazz = clazz
	  */



	  let gwSkill = new GwSkill(
	  	clazzSkills[i]['icon'],
	  	clazzSkills[i]['name'],
	  	clazzSkills[i]['description'],
	  	clazzSkills[i]['energy'],
	  	clazzSkills[i]['activationTime'],
	  	clazzSkills[i]['rechargeTime'],
	  	clazzSkills[i]['attribute'],
	  	clazzSkills[i]['campaign'],
	  	clazz,
	  	clazzSkills[i]['addrenaline']
	  )
	  console.log(gwSkill)
	  Database.databaseData[clazz][gwSkill.name] = gwSkill
	  Database.skillNames.push(gwSkill.name)
	}
  }

    static GetSkillByName(skillName) {
      for (const clazz of Object.keys(Database.databaseData)) {
        const classSkills = Database.databaseData[clazz];
        if (classSkills[skillName]) {
          return classSkills[skillName];
        }
      }
      return null;
    }
}

export default Database;