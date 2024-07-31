# Foundry-Pathfinder2e-Random-Encounter-Generator

## Description
### Pathfinder 2e Random Encounter Generator
A module that is capable of generating actors from a set of data that can be placed on a game map. Actors will utilize data that is stored in a database and users will have the ability to tune the generation to their preferences.
### Revision History
| Date | Comment | Author |  
| --- | --- | --- |  
| 2024-07-30 | Created the mandatory files to the project | Kroacthu |

## Overview
### Purpose
This module's intended use is for people who would like to play with an encounter with numbers that are comfortable according to the level of power that is to fight against the encounter. Particularly when a group of players enjoys doing the unexpeceted and wants finds themselves in a scenario in which combat would make sense but the tokens for such an encounter were not prepared
### Scope
- User is capable of manipulating the random encounter generation to a certain degree through their own input
- Generator is able to create actors and put them within a folder under the actors directory of the foundry program
### Requirements
**Functional**
- Accepting user input to add to the variables that the random generation will filter for  
- Transfering string information from a database to the user and then constructing a JSON from said information

**Non-functional**  
- Performance: Handling consistent transfer of information between user and server  
- Reliability: Being able to read and write JSON strings fairly quickly  

**Technical**  
- Hardware: Any computer that is capable of running web-based applications and some form of user input  
- Software: Javascript, css, html, and an online database that is capable of storing string information and potentially images  

**Security**
- There should be no sensitive information that is being utilized in this program

**Estimates**
- 10 hours of research for UI and application-specific purposes  

## System Architecture
**Overview**  
The Foundry virtual Tabletop (VTT) program is the basis for specialized functions and libraries. An HTML page acts as the window for accepting user-input which sends information to a javascript file that handles parsing information and creating the correct format to query from a database. Once the database has been queried, the information will be sent back to the javascript file and it will be parsed to properly format a JSON that gets parsed within Foundry's own systems.

**Diagram**  
TBD

## Data Dictionary
- VTT: Virtual Tabletop, an application that is meant to be utilized in for the purpose of playing traditionally tabletop board games.
- JSON: A standardized text format that is capable of being read by particularly javascript
- Actor: A JSON that has been parsed within foundry's systems in order to render a game playable user interface object. There are many variables that can be changed within an actor such as stats, thumbnail image, token size, and name.
- Token: An actor that has been rendered on the game board of the VTT

TODO : FILL AS I PROGRAM MORE

## Data Design
**Persistent / Static Data**  
N/A (currently)  
**Dataset**  
TODO : CREATE THIS AS I ACQUIRE ALL NECESSARY JSON FORMATTING INFORMATION

## User Interface Design
**User Interface Design Overview**
TBD

**User Interface Navigation Flow**
TBD

**Use Cases / User Function Description**  
Screens have not currently been plotted out to their fullest extent due to the amount of potential variables in user input that may be required.
- Help Window : Gives instructions in a tutorial format to show users how to generate their encounters
- Main Popup Window : Shows the user their options for manipulating the random encounter generation. Includes a button to start the generation.

## Testing

## Monitoring

## Other Interfaces

## Extras

## References
[Foundry Module Development Introduction](https://foundryvtt.com/article/module-development/)  
[Foundry Module Documentation](https://foundryvtt.com/api/modules/foundry.html)


## Glossary