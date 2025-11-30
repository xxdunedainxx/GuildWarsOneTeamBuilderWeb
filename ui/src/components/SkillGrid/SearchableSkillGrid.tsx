// SearchableSkillGrid.tsx
import SkillGridCell from "./SkillGridCell";
import React, { Component } from "react";
import Database from '../../src/data/database/Database';
import GwClasses from '../../src/data/models/GwClass';
import GwSkill from '../../src/data/models/GwSkill';


class SearchableSkillGrid extends Component<{}, { searchTerm: string; selectedClass: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: "",
      selectedClass: ""
    };
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedClass: event.target.value });
  }

  render() {
    const { searchTerm, selectedClass } = this.state;
    const classNames = Object.values(GwClasses);

    // Flatten all filtered skills into a single array
    const filteredSkills = Object.entries(Database.databaseData)
      .filter(([className]) => !selectedClass || className === selectedClass)
      .flatMap(([_, skills]) =>
        Object.entries(skills).filter(([skillName]) =>
          skillName.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(([_, skillObj]) => skillObj)
      );

    return (
      <div
          style={{
//             maxWidth: "250px", // total height for dropdowns + grid
            maxHeight: "100vh",       // fill viewport height
            overflowY: "auto",
            overflowX: "hidden", // disable horizontal scroll
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
      >
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search skills..."
          style={{
              marginBottom: "10px",
              padding: "5px",
              fontSize: "18px",
              width: "100%",
              boxSizing: "border-box" // include padding in width
          }}
        />

        {/* Class dropdown */}
        <select value={selectedClass} onChange={this.handleClassChange} style={{ padding: "5px", marginLeft: "10px", fontSize: "18px"  }}>
          <option value="">All Classes</option>
          {classNames.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        {/* Skill grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "8px",
            marginTop: "20px"
          }}
        >
          {filteredSkills.map((skillObj: GwSkill) => (
            <SkillGridCell
              key={skillObj.name}
              name={Array.isArray(skillObj.name) ? skillObj.name[0] : skillObj.name}
              clazz={skillObj.clazz}
              attribute={skillObj.attribute}
              energy={skillObj.energy}
              activationTime={skillObj.activationTime}
              rechargeTime={skillObj.rechargeTime}
              description={skillObj.description}
              isDraggableSkill={false}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchableSkillGrid;
