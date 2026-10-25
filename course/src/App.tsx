
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface HeaderProps {
  name: string;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
        </div>
      );

    case "group":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          project exercises {part.groupProjectCount}
        </div>
      );

    case "background":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          submit to{" "}
          <a href={part.backgroundMaterial}>
            {part.backgroundMaterial}
          </a>
        </div>
      );

    case "special":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(", ")}
        </div>
      );

    default:
      return assertNever(part);
  }
};

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.name} style={{ marginBottom: "15px" }}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

interface TotalProps {
  parts: CoursePart[];
}

const Total = ({ parts }: TotalProps) => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
