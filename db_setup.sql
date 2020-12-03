/* Note: this drops all existing tables in database 
Need to \c to correct database and then run */


-- Need to run the below code in console if changes are made to this file.
-- psql -f  db_setup.sql postgres://hvhulxrvsjlwkv:9fdd5965455c0af53d23683dd8d56e32bad6f62774a4946a915d8ffd8c608d88@ec2-52-5-176-53.compute-1.amazonaws.com:5432/d74r6poconlmpp

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
    groupName VARCHAR(50) NOT NULL UNIQUE
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



