
```
    .::::     .:::::::    .::   .::        .:
  .::    .::  .::    .::  .::  .::        .: ::
.::        .::.::    .::  .:: .::        .:  .::
.::        .::.: .::      .: .:         .::   .::
.::        .::.::  .::    .::  .::     .:::::: .::
  .::     .:: .::    .::  .::   .::   .::       .::
    .::::     .::      .::.::     .::.::         .::

```

### [VIDEO DEMO HERE](https://www.loom.com/share/85655ff9266e40c28865aeb90c2c7c02?sid=e4d47a18-49ee-4ba8-ab6c-77117b3784b1)

### Project Management for Creatives
Orka was built for the ad agency Jackson & Moran in order to help creative teams keep projects on time. It manages clients, projects, contacts, and tasks in order too keep all relevant information in one place and everyone on the same page. _The app is deployed with AWS (EC2 & Amplify) but is currently only available for internal employees_

### Features
- Client Management with Business information, Address, and Contacts
- Project Management with Deadlines, Assigned Users, and Tasks
- Task Threads
    - Users can start message threads on individual tasks in order to keep internal convos organized and relevant 

### Specs
#### FrontEnd
The user interface was built using React and styled with Tailwind CSS. Other libraries used are React Dropzone, Formik, and Yum.
#### BackEnd
The Backend API is set up with an a NGNIX proxy that uses Certbot to run on HTTPS, a Django Server for querying and handling data, and a Postgresql database. The production version is currently running on EC2 and is deployed using Docker.


