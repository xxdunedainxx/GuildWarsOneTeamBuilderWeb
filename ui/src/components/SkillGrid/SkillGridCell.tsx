// SkillGridCell.tsx
import React, { Component, createRef } from "react";
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';

import Logger from '../../src/utils/Logger';

interface SkillGridCellProps {
  name: string;
  clazz: string;
  attribute: string;
  energy: number;
  activationTime: number;
  rechargeTime: number;
  description: string;
  isDraggableSkill?: boolean; // whether this cell can accept drops
  handleSkillDropped?: (skillName: string) => boolean; // callback when a skill is dropped
  handleSkillRemoved?: (skillName: string, resetCell?: () => void) => boolean; // callback when removed
}

interface SkillGridCellState {
  name: string;
  clazz: string;
  attribute: string;
  energy: number;
  activationTime: number;
  rechargeTime: number;
  description: string;
}

export default class SkillGridCell extends Component<SkillGridCellProps, SkillGridCellState> {
  tooltipRef = createRef<any>();

  constructor(props: SkillGridCellProps) {
    super(props);

    // Initialize state from props
    this.state = {
      name: props.name,
      clazz: props.clazz,
      attribute: props.attribute,
      energy: props.energy,
      activationTime: props.activationTime,
      rechargeTime: props.rechargeTime,
      description: props.description,
    };
  }

  // Drag and drop handler
  handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (this.props.isDraggableSkill) {
      Logger.info("Is draggable skill");
      e.preventDefault();
      const skillData = e.dataTransfer.getData("application/json");
      if (skillData) {
        Logger.info("Has skill data");
        const skill = JSON.parse(skillData);

        // Only drop if not already dropped
        if (this.props.handleSkillDropped && !this.props.handleSkillDropped(skill.name)) {
          Logger.info("Dropping skill into cell");

          this.setState({
            name: skill.name,
            clazz: skill.clazz,
            attribute: skill.attribute,
            energy: skill.energy,
            activationTime: skill.activationTime,
            rechargeTime: skill.rechargeTime,
            description: skill.description,
          });
        }
      }
    }
  };

  handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // needed to allow drop
  };

  // Remove skill handler
  handleRemoveSkill = () => {
    const { name } = this.state;
    if (!name) return; // nothing to remove

    Logger.info(`Removing skill: ${name}`);

    if (this.props.handleSkillRemoved) {
      // Pass a callback to reset the cell state
      this.props.handleSkillRemoved(name, this.resetCell);
    } else {
      // fallback: just reset the cell locally
      this.resetCell();
    }
  };

  // Reset this cell's state
  resetCell = () => {
    this.setState({
      name: "",
      clazz: "",
      attribute: "",
      energy: 0,
      activationTime: 0,
      rechargeTime: 0,
      description: "",
    });
  };

  render() {
    const { name, clazz, attribute, energy, activationTime, rechargeTime, description } = this.state;
    const { isDraggableSkill } = this.props;

    return (
      <div
        style={{
          position: "relative",
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: "center",
          borderRadius: "4px",
          cursor: "grab",
          width: "150px",
        }}
        draggable={!!name} // only draggable if it has a skill
        onDragStart={(e) => {
//             if (this.tooltipRef.current) {
//                 console.log(tooltipRef)
//               this.tooltipRef.current.hide();
//             }
          e.dataTransfer.setData("application/json", JSON.stringify(this.state));

        }}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
      >


        {/* Remove button */}
        {isDraggableSkill && name && (
          <button
            onClick={this.handleRemoveSkill}
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              border: "none",
              background: "transparent",
              color: "red",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
              lineHeight: "1",
              zIndex: 10,
            }}
          >
            ×
          </button>
        )}
           {name != "" && (

          <Tippy
          placement="left-end"
          interactive={true}
          delay={[50, 50]}
          trigger="mouseenter"
          content={
                <div style={{ textAlign: "left", fontSize: "12px" }}>
                      <div><strong>{name}</strong></div>
                      <div><strong>Class:</strong> {clazz}</div>
                      <div><strong>Attribute:</strong> {attribute}</div>
                      <div>
                        <strong>
                          <img src="/utilIcons/energy.png" alt="Energy" style={{ width: "16px", height: "16px", marginRight: "4px" }} />
                          Energy:
                        </strong> {energy}
                      </div>
                      <div>
                        <strong>
                          <img src="/utilIcons/activation.png" alt="Activation" style={{ width: "16px", height: "16px", marginRight: "4px" }} />
                          Activation:
                        </strong> {activationTime}s
                      </div>
                      <div>
                        <strong>
                          <img src="/utilIcons/rechargeIcon.png" alt="Recharge" style={{ width: "16px", height: "16px", marginRight: "4px" }} />
                          Recharge:
                        </strong> {rechargeTime}s
                      </div>
                        {/* Only description uses dangerouslySetInnerHTML */}
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
              }
            >
              <div style={{ textAlign: "center", cursor: "pointer" }}>
                <img
                  src={`/images/${name}.jpg`}
                  alt={name}
                  style={{ width: "60px", height: "60px", display: "block", margin: "0 auto" }}
                />
                <div>{name}</div>
               </div>
        </Tippy>

            )
           }

           {name == "" && (<div>Empty</div>)}
      </div>
    );
  }
}
