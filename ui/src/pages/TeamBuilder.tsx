import SkillGrid from "../components/SkillGrid/SkillGrid";
import Setup from '../src/utils/Setup';
import Database from '../src/data/database/Database';
import SearchableSkillGrid from '../components/SkillGrid/SearchableSkillGrid';

export default function TeamBuilder() {
    return (
      <div>
      <h2>Some information on how to use the tool (may be moved to a 'user guide' in the future)</h2>
        <ul>
            <li>You can drag skills from the right skill column to a designated player's skill slot.</li>
            <li>You can search for skills in the left column and filter by class.</li>
            <li>You can search for skills in the left column and filter by class.</li>
            <li>In order to drag a skill to a designated player slot, they must have a compatible class
            (warrior skills can only go to bars that have primary or secondary class of warrior).</li>
            <li><strong style={{color: "red"}}>NOTE: There are a few skills
            I have not added to the database yet. Specifically a
            few necro and ritualist skills. This will be addressed in a future release</strong></li>
        </ul>

      <div style={{ display: "flex", gap: "20px" }}>

        <div
            style={{
              flex: 1, // takes up available space
              maxHeight: "100vh", // max height is viewport height
              overflowY: "auto",  // enable vertical scrolling
              padding: "10px",
              border: "1px solid #ccc",
              minWidth: "70%",
              borderRadius: "4px",
              boxSizing: "border-box", // include padding/border in height
            }}
        >
        <h3>Player 1</h3>
        <SkillGrid />
        <h3>Player 2</h3>
        <SkillGrid />
        <h3>Player 3</h3>
        <SkillGrid />
        <h3>Player 4</h3>
        <SkillGrid />
        <h3>Player 5</h3>
        <SkillGrid />
        <h3>Player 6</h3>
        <SkillGrid />
        <h3>Player 7</h3>
        <SkillGrid />
        <h3>Player 8</h3>
        <SkillGrid />
        </div>
        <div style={{ flex: 2, minWidth: "27.5%" }}>
            <SearchableSkillGrid />
        </div>
        </div>
        </div>
    )
}