const data = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cfBfb1",
        description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        date: "2015-01-02",
        specialist: "MD House",
        type: "Hospital",
        diagnosisCodes: ["S62.5"],
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed."
        }
      },
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cfBfb2",
        description: "Severe concussion from falling down concrete stairs during an altercation.",
        date: "2018-05-12",
        specialist: "Dr. Hibbert",
        type: "HealthCheck",
        healthCheckRating: 2,
        diagnosisCodes: ["M51.2"]
      }
    ]
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop",
    entries: [
      {
        id: "m1111111-70b3-4d90-b090-4535c7cfBfb1",
        description: "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.",
        date: "2019-08-05",
        specialist: "Dr. L. A. Hall",
        type: "HealthCheck",
        healthCheckRating: 1,
        diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"]
      }
    ]
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "other",
    occupation: "Technician",
    entries: [
      {
        id: "h2222222-70b3-4d90-b090-4535c7cfBfb1",
        description: "Falling from a high building. Multiple traumas.",
        date: "2020-04-11",
        specialist: "Dr. Who",
        type: "Hospital",
        diagnosisCodes: ["S62.5", "J10.1"],
        discharge: {
          date: "2020-05-11",
          criteria: "Deceased"
        }
      }
    ]
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female",
    occupation: "Forensic Pathologist",
    entries: [
      {
        id: "d3333333-70b3-4d90-b090-4535c7cfBfb1",
        description: "Annual occupational health check-up. Feeling overworked due to FBI paranormal cases.",
        date: "2018-10-05",
        specialist: "Dr. Spender",
        type: "OccupationalHealthcare",
        employerName: "FBI",
        sickLeave: {
          startDate: "2018-10-06",
          endDate: "2018-10-10"
        },
        diagnosisCodes: ["Z74.3"]
      },
      {
        id: "d3333333-70b3-4d90-b090-4535c7cfBfb2",
        description: "Exposures to an unknown alien pathogen while investigating a remote forest site.",
        date: "2021-03-22",
        specialist: "Dr. Scully",
        type: "Hospital",
        diagnosisCodes: ["Z57.1", "J10.1"],
        discharge: {
          date: "2021-04-02",
          criteria: "Fully recovered after experimental treatment."
        }
      },
      {
        id: "d3333333-70b3-4d90-b090-4535c7cfBfb3",
        description: "Routine physical wellness check. All vitals normal.",
        date: "2022-01-15",
        specialist: "Dr. Greenwood",
        type: "HealthCheck",
        healthCheckRating: 0
      }
    ]
  },
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: "male",
    occupation: "Digital evangelist",
    entries: [
      {
        id: "m4444444-70b3-4d90-b090-4535c7cfBfb1",
        description: "Strained wrist from excessive typing and creating TypeScript tutorials.",
        date: "2021-02-14",
        specialist: "Dr. Code",
        type: "HealthCheck",
        healthCheckRating: 0,
        diagnosisCodes: ["M51.2"]
      }
    ]
  }
];

export default data;