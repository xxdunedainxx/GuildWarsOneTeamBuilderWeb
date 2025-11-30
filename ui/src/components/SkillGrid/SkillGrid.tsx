// GridRow.tsx
import React, { Component } from "react";
import SkillGridCell from "./SkillGridCell";
import Logger from '../../src/utils/Logger';
import GwClasses from '../../src/data/models/GwClass';
import Database from "../../src/data/database/Database";
import ColorThemes from "../../src/ui/ColorThemes";

interface GridRowState {
  droppedSkills: string[];
  hasElite: boolean;
  selectedClassPrimary: string;
  selectedClassSecondary: string;
}

export default class SkillGrid extends Component<{}, GridRowState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      droppedSkills: [],
      hasElite: false,
      selectedClassPrimary: "",
      selectedClassSecondary: ""
    };
  }

  // Callback passed to SkillGridCell
  handleSkillDropped = (skill: string): boolean => {
    const { droppedSkills } = this.state;
    const alreadyDropped = droppedSkills.includes(skill);
    Logger.info(`Checking if skill dropped already '${skill}' and if compatible with this skill bar`)

    let skillStructured = Database.GetSkillByName(skill)
    if (!alreadyDropped &&
    (skillStructured.clazz == this.state.selectedClassSecondary
        || skillStructured.clazz == this.state.selectedClassPrimary) && (this.state.hasElite == false || skillStructured.isElite == false)) {
      this.setState({ droppedSkills: [...droppedSkills, skill], hasElite: skillStructured.isElite });
    } else {
        let message="Skill already dropped or not compatible with primary/secondary classes"
        Logger.info(message)
        alert(message)
        return true
    }

    // Return true if already dropped, false if newly added
    return alreadyDropped;
  };

    handleSkillRemoved = (skill: string, resetCell?: () => void): boolean => {
      Logger.info(`Removing skill: ${skill}`);
      if (!this.state.droppedSkills.includes(skill)) return false;

      this.setState((prev) => ({
        droppedSkills: prev.droppedSkills.filter((s) => s !== skill),
      }));

      let skillStructured = Database.GetSkillByName(skill)
      if(skillStructured.isElite){
        Logger.info("Elite removed, reset 'hasElite' attribute")
        this.setState({hasElite: false})
      }

      if (resetCell) resetCell(); // reset the cell UI
      return true;
    };

    // todo handle class changes
    handleClassChangePrimary = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("Selected class change:", event.target.value);
      this.setState({ selectedClassPrimary: event.target.value });
    }

    handleClassChangeSecondary = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("Selected class change:", event.target.value);
      this.setState({ selectedClassSecondary: event.target.value });
    }

    hasPrimaryClassSelected(){
        return this.state.selectedClassPrimary != ""
    }

    hasSecondaryClassSelected(){
        return this.state.selectedClassSecondary != ""
    }

    getDarkBackgroundColor() {
        if(!this.hasPrimaryClassSelected()){
            return ColorThemes.GW_CLASS_THEMES[GwClasses.PLACEHOLDER].dark
        } else {
            Logger.info("Setting color")
            console.log(ColorThemes.GW_CLASS_THEMES[this.state.selectedClassPrimary].dark)
            return ColorThemes.GW_CLASS_THEMES[this.state.selectedClassPrimary].dark
        }
    }

    getBackgroundColor(){
        if(!this.hasPrimaryClassSelected()){
            return ColorThemes.GW_CLASS_THEMES[GwClasses.PLACEHOLDER].primary
        } else {
            Logger.info("Setting color")
            console.log(ColorThemes.GW_CLASS_THEMES[this.state.selectedClassPrimary].primary)
            return ColorThemes.GW_CLASS_THEMES[this.state.selectedClassPrimary].primary
        }
    }

    getBorderColor(){
        if(!this.hasPrimaryClassSelected()){
            return ColorThemes.GW_CLASS_THEMES[GwClasses.PLACEHOLDER].border
        } else {
            Logger.info("Setting border color")
            console.log(ColorThemes.GW_CLASS_THEMES[this.state.selectedClassPrimary].border)
            return ColorThemes.GW_CLASS_THEMES[this.state.selectedClassPrimary].border
        }
    }


    render() {
      const { selectedClassPrimary, selectedClassSecondary } = this.state;
      const classNames = Object.values(GwClasses);

      return (
        // Outer container with vertical scroll
        <div
          style={{
            maxHeight: "500px", // total height for dropdowns + grid
            overflowY: "auto",
            padding: "10px",
            position: "relative",
            borderRadius: "4px",
            border: `2px solid ${this.getBorderColor()}`,
            backgroundColor: this.getBackgroundColor(),
          }}
        >
          {/* Icon in top left */}
          {this.hasPrimaryClassSelected() && (
          <img
            src={`./classIcons/${this.state.selectedClassPrimary}.png`}
            alt="Class icon"
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              top: "10px",
              right: "50px"
            }}
          />)}

          {this.hasSecondaryClassSelected() && (
          <img
            src={`./classIcons/${this.state.selectedClassSecondary}.png`}
            alt="Class icon"
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              top: "10px",
              right: "10px"
            }}
          />)}

          {/* Dropdowns */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginBottom: "10px",
            backgroundColor: this.getDarkBackgroundColor()
           }}>
            <select
              value={selectedClassPrimary}
              onChange={this.handleClassChangePrimary}
              style={{ padding: "2px 4px", fontSize: "18px", width: "200px" }}
            >
              <option value="">NOT SELECTED</option>
              {classNames.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <select
              value={selectedClassSecondary}
              onChange={this.handleClassChangeSecondary}
              style={{ padding: "2px 4px", fontSize: "18px", width: "200px" }}
            >
              <option value="">NOT SELECTED</option>
              {classNames.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Skill grid */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap", // allow multiple rows
            }}
          >
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkillGridCell
                key={idx}
                name=""
                clazz=""
                attribute=""
                energy={0}
                activationTime={0}
                rechargeTime={0}
                description=""
                isDraggableSkill={true}
                handleSkillDropped={this.handleSkillDropped}
                handleSkillRemoved={this.handleSkillRemoved}
              />
            ))}
          </div>
        </div>
      );
    }
}
