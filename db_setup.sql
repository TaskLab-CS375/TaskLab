/* Note: this drops all existing tables in database 
Need to \c to correct database and then run */
drop schema public cascade;
create schema public;

CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50)
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
    startTime timestamp,
    endTime timestamp
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
    taskDescription VARCHAR(50),
    taskStatus VARCHAR(50),
    startTime timestamp,
    endTime timestamp
);



