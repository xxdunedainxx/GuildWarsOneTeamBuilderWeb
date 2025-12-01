from bs4 import BeautifulSoup
import requests
import sys, traceback
import json
import os

FAILED_SKILLS_BY_CATEGORY={}

def errorStackTrace(e):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    trace = traceback.format_exc()
    errorMessage = ("STACK TRACE ERROR :: " + str(e) + ".. Line number: " + str(
        exc_tb.tb_lineno) + "-- STACK TRACEBACK: " + str(trace))
    return errorMessage

def downloadSkillImage(url, skillName):
    fileName = f"dataMiningResults/images/{skillName}.jpg"
    # small optimization, check if file already cached
    if os.path.isfile(fileName):
        print(f"File already exists: {fileName}")
    else:
        print(f"File does not exist, downloading: {fileName}")
        response = requests.get(url)
        with open(fileName, "wb+") as f:
            f.write(response.content)

        print(f"Downloaded {url}")

class SkillContainer:
    def __init__(
        self,
        iconLink: str,
        name: str,
        description: str,
        addrenalineNeeded: int,
        energyNeeded: int,
        activationTime: int,
        rechargeTime: int,
        attribute: str,
        campaign: str,
        clazz: str,
        sacrifice: str,
        exhaust: int
    ):
        self.icon = iconLink
        self.name = name
        self.description = description
        self.addrenaline = addrenalineNeeded
        self.energy = energyNeeded
        self.activationTime = activationTime
        self.rechargeTime = rechargeTime
        self.attribute = attribute
        self.campaign = campaign
        self.clazz = clazz
        self.sacrifice = sacrifice
        self.exhaust = exhaust

    def serialize(self):
        return {
            "icon": self.icon,
            "name": self.name,
            "description": self.description,
            "addrenaline": self.addrenaline,
            "energy": self.energy,
            "activationTime": self.activationTime,
            "rechargeTime": self.rechargeTime,
            "attribute": str(self.attribute),
            "campaign": self.campaign,
            "class": self.clazz,
            "sacrifice": self.sacrifice,
            "exhaust" : self.exhaust
        }

def processSkillList(url: str, clazz: str, allSkillsByclass):
    allSkillsByclass[clazz] = []

    htmlPageData=requests.get(
        url
    )

    soup = BeautifulSoup(htmlPageData.content, 'lxml')

    tableBodies=soup.find_all(
        "table",
        class_="sortable"
    )

    allRows=tableBodies[0].find_all("tr")

    for row in allRows:

        rowTableHeaders = row.find_all("th")
        rowTableData=row.find_all("td")
        name = None
        try:
            if len(rowTableData) != 0:
                imageLink=rowTableHeaders[0].find("img").get("src")
                name=rowTableHeaders[1].find("a").contents
                if type(name) == list:
                    name = str(rowTableHeaders[1].find("a").contents[0])

                description=str(rowTableData[0].contents).strip().replace("[","").replace("]","")

                # Not required
                # if type(description) == list:
                #     description = str(rowTableData[0].contents[0])

                if " 0 " in str(rowTableData[1].contents) or ">0<" in str(rowTableData[1].contents):
                    addrenaline = 0
                    sacrifice="0"
                    exhaust=0
                else:
                    # If int, its an adrenaline record
                    if str(rowTableData[1].contents[0]).strip().isdigit():
                        # if elementalist - exhaustion column not adrenaline
                        if clazz == "Elementalist":
                            exhaust=int(str(rowTableData[1].contents[0]).strip())
                            addrenaline=0
                            sacrifice="0"
                        else:
                            # otherwise, likely adrenaline
                            addrenaline=int(str(rowTableData[1].contents[0]).strip())
                            exhaust=0
                            sacrifice="0"
                    else:
                        # this is a sacrifice record, not adrenaline
                        sacrifice=str(rowTableData[1].contents[1]).strip()
                energy=int(rowTableData[2].find("span").contents[0])
                activationtime=float(rowTableData[3].find("span").contents[0])
                if str(rowTableData[4].find("span").contents[0]).isnumeric():
                    rechargeTime=float(rowTableData[4].find("span").contents[0])
                else:
                    # Could improve/make more flexible eventually
                    rechargeTime=-1
                attribute=str(rowTableData[6].contents[0])

                if attribute == '<span style="display: none;">Z</span>':
                    attribute="None"
                campaign=rowTableData[7].find("a").contents

                skill = SkillContainer(
                    iconLink=imageLink,
                    name=name,
                    description=description,
                    addrenalineNeeded=addrenaline,
                    energyNeeded=energy,
                    activationTime=activationtime,
                    rechargeTime=rechargeTime,
                    attribute=attribute,
                    campaign=campaign,
                    clazz=clazz,
                    sacrifice=sacrifice,
                    exhaust=exhaust
                )

                allSkillsByclass[clazz].append(skill)
                downloadSkillImage(f"https://wiki.guildwars.com{imageLink}", skillName=skill.name)
        except Exception as e:
            print("Issue with entry")
            print(f"{errorStackTrace(e)}")
            if clazz not in FAILED_SKILLS_BY_CATEGORY:
                FAILED_SKILLS_BY_CATEGORY[clazz] = {}
                FAILED_SKILLS_BY_CATEGORY[clazz]["count"] = 0
                FAILED_SKILLS_BY_CATEGORY[clazz]["names"] = []
                FAILED_SKILLS_BY_CATEGORY[clazz]["exceptions"] = []

            FAILED_SKILLS_BY_CATEGORY[clazz]["count"]+=1
            FAILED_SKILLS_BY_CATEGORY[clazz]["exceptions"].append(f"{errorStackTrace(e)}")
            if name != None:
                FAILED_SKILLS_BY_CATEGORY[clazz]["names"].append(name)


        print("Iter row")


    print(f"Retrieved from: {url}")

def create_json_db():
    print("Creating json DB")

    DB = {}

    for category in ALL_SKILLS_BY_CLASS.keys():
        skillsByClassArray = ALL_SKILLS_BY_CLASS[category]

        for skill in skillsByClassArray:
            skillStructured: SkillContainer = skill
            if skillStructured.clazz not in DB.keys():
                DB[skillStructured.clazz] = []

            DB[skillStructured.clazz].append(skillStructured.serialize())

    with open('./dataMiningResults/db.json', 'w') as fp:
        json.dump(
            DB,
            fp,
            indent=4
        )

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print('Start parsing GW skills')
    ALL_SKILLS_BY_CLASS = {

    }

    # # Warrior skills
    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_warrior_skills",
        clazz="Warrior",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )


    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_ranger_skills",
        clazz="Ranger",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )


    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_monk_skills",
        "Monk",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_necromancer_skills",
        "Necromancer",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_mesmer_skills",
        "Mesmer",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_elementalist_skills",
        "Elementalist",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_assassin_skills",
        "Assassin",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_ritualist_skills",
        "Ritualist",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_paragon_skills",
        "Paragon",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_dervish_skills",
        "Dervish",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    processSkillList(
        "https://wiki.guildwars.com/wiki/List_of_common_skills",
        "Common",
        allSkillsByclass=ALL_SKILLS_BY_CLASS
    )

    print("done")
    print(FAILED_SKILLS_BY_CATEGORY)
    print(ALL_SKILLS_BY_CLASS)

    create_json_db()

    with open('./dataMiningResults/errorReport.json', 'w') as fp:
        json.dump(
            FAILED_SKILLS_BY_CATEGORY,
            fp,
            indent=4
        )


