import useScrollReveal from "../hooks/useScrollReveal.js";

const rows = [
  {
    key: "row1",
    projects: [
      { size: "small", image: "project1.png", title: "Bingo", tag: "PHOTO" },
      { size: "large", image: "project2.png", title: "Field", tag: "PHOTO" },
      { size: "small", image: "project3.png", title: "Bridge", tag: "ILLUSTRATION" },
    ],
  },
  {
    key: "row2",
    projects: [
      { size: "half", image: "project4.png", title: "Raybans", tag: "WEBSITE" },
      { size: "half", image: "project5.png", title: "Sand", tag: "WEBSITE" },
    ],
  },
  {
    key: "row3",
    projects: [
      { size: "third", image: "project6.png", title: "People", tag: "WEBSITE" },
      { size: "third", image: "project7.png", title: "Beach", tag: "AIR PRINT" },
      { size: "third", image: "project8.png", title: "Lake", tag: "WEBSITE" },
    ],
  },
  {
    key: "row4",
    projects: [
      { size: "half", image: "project9.png", title: "Sky", tag: "WEBSITE" },
      { size: "half", image: "project10.png", title: "Ocean", tag: "WEBSITE" },
    ],
  },
];

export default function Projects() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="projects animate" ref={ref}>
      <div className="container">
        <div className="projects-header">
          <h2>My Projects</h2>
        </div>
      </div>

      <div className="projects-content">
        {rows.map((row) => (
          <div className={`row ${row.key}`} key={row.key}>
            {row.projects.map((project) => (
              <div className={`project ${project.size}`} key={project.image}>
                <img src={`/img/${project.image}`} alt={project.title} />

                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.tag}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
