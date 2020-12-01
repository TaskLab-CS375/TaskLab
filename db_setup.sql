/* Note: this drops all existing tables in database 
Need to \c to correct database and then run */
drop schema public cascade;
create schema public;

CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    email VARCHAR,
    password VARCHAR
);

CREATE TABLE Groups (
    groupID SERIAL PRIMARY KEY,
    groupName VARCHAR(50)
);

/* Link users to groups */
CREATE TABLE UserGroups  (
    groupID INTEGER REFERENCES Groups(groupID),
    userID INTEGER REFERENCES Users(userID)
);

CREATE TABLE Projects (
    projectID SERIAL PRIMARY KEY,
    projectName VARCHAR(50),
    groupID INTEGER REFERENCES Groups(groupID),
    projectStatus VARCHAR(50),
    startTime timestamptz,
    endTime timestamptz
);

/* Link users to projects */
CREATE TABLE UserProjects  (
    projectID INTEGER REFERENCES Projects(projectID),
    userID INTEGER REFERENCES Users(userID)
);

CREATE TABLE Tasks (
    taskID SERIAL PRIMARY KEY,
    projectID INTEGER REFERENCES Projects(projectID),
    taskName VARCHAR(50),
    percentComplete INTEGER,
    startTime timestamptz,
    endTime timestamptz
);



