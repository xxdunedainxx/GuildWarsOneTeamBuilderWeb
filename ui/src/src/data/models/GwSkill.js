/*
   Example Snippet from DB: 
   {
    "icon": "/images/3/32/%22Charge%21%22.jpg",
    "name": [
        "\"Charge!\""
    ],
    "description": "['Elite Shout. (', <span style=\"color: green; font-weight: bold;\">5...11...13</span>, ' seconds.) Allies in earshot move 33% faster. ', <a href=\"/wiki/Initial_effect\" title=\"Initial effect\">Initial effect</a>, ': these allies lose the Crippled condition.']",
    "addrenaline": 0,
    "energy": 5,
    "activationTime": 0.0,
    "rechargeTime": 20.0,
    "attribute": "Tactics",
    "campaign": [
        "Core"
    ],
    "class": "Warrior"
	},

*/
export class GwSkill {
	constructor (
		// ORIGINAL location of the skill icon that represents this skill from GW Wiki 
		// This will likely not be used by the client to fetch the image data
		// Will likely use internal Image DB for fetching the image 
		skillIconLocation, 
		// simple skill name
		name, 
		description, 
		// energy required for skill
		energy,
		// how long skill takes to activate
		activationTime,
		// how long skill takes to recharge 
		rechargeTime,
		// Todo -- attribute icon?
		attribute,
		// what GW campaign the skill is from 
		campaign,
		// class specific to this skill 
		clazz,
		// optional - adrenaline
		adrenaline = null,
		// optional sacrifice attribute
		sacrifice = null,
		// optional - exhaustion
		exhaustion = null
	){
		this.skillIconLocation = skillIconLocation
		this.name = name
		this.description = description
		this.energy = energy
		this.activationTime = activationTime
		this.rechargeTime = rechargeTime
		this.attribute = attribute
		this.campaign = campaign
		this.clazz = clazz
		// Not a great way to check, TODO and improve later
		if(this.description.includes("Elite ")){
		    this.isElite = true
		} else {
		    this.isElite = false
		}
		this.adrenaline = adrenaline
		this.sacrifice = sacrifice
		this.exhaustion = exhaustion
	}
}


export default GwSkill;