// SearchableSkillGrid.tsx
import SkillGridCell from "./SkillGridCell";
import React, { Component } from "react";
import Database from '../../src/data/database/Database';
import GwClasses from '../../src/data/models/GwClass';
import GwSkill from '../../src/data/models/GwSkill';


class SearchableSkillGrid extends Component<
  {},
  { searchTerm: string; selectedClass: string; loading: boolean; skills: GwSkill[] }
> {

  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: "",
      selectedClass: "",
      loading: true,
      skills: []
    };
  }

  componentDidMount() {
    // Defer heavy computation so React can paint "Loading..."
    setTimeout(() => {
      const skills = Object.entries(Database.databaseData)
        .flatMap(([_, skills]) =>
          Object.values(skills)
        ) as GwSkill[];

      this.setState({ skills, loading: false });
    }, 0);
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedClass: event.target.value });
  };

  getFilteredSkills() {
    const { searchTerm, selectedClass, skills } = this.state;

    return skills.filter((skill) => {
      const matchesClass = !selectedClass || skill.clazz === selectedClass;
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }

  render() {
    const { loading, searchTerm, selectedClass } = this.state;

    if (loading) {
      return <div style={{ padding: "10px" }}>Loading skills...</div>;
    }

    const filteredSkills = this.getFilteredSkills();
    const classNames = Object.values(GwClasses);

    return (
      <div style={{ maxHeight: "100vh", overflowY: "auto", padding: "10px",
                    border: "1px solid #ccc", borderRadius: "15px" }}>

        <input
          type="text"
          value={searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search skills..."
          style={{ marginBottom: "10px", padding: "5px", fontSize: "18px", width: "100%" }}
        />

        <select
          value={selectedClass}
          onChange={this.handleClassChange}
          style={{ padding: "5px", marginLeft: "10px", fontSize: "18px" }}
        >
          <option value="">All Classes</option>
          {classNames.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px", marginTop: "20px" }}>
          {filteredSkills.map((skill) => (
            <SkillGridCell
              key={skill.name}
              name={Array.isArray(skill.name) ? skill.name[0] : skill.name}
              clazz={skill.clazz}
              attribute={skill.attribute}
              energy={skill.energy}
              activationTime={skill.activationTime}
              rechargeTime={skill.rechargeTime}
              description={skill.description}
              adrenaline={skill.adrenaline}
              exhaustion={skill.exhaustion}
              sacrifice={skill.sacrifice}
              isDraggableSkill={false}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchableSkillGrid;
