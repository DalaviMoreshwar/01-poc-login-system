# POC - Persist Login Details

Problem Statement:

The objective of this proof-of-concept (POC) is to address the challenge of persisting logged-in user details in a React.js application. Currently, in the project, the logged-in user details are not being persisted effectively. The application initially utilized `sessionStorage` to store the data, but retrieving the details from `sessionStorage` after login became problematic. As an alternative approach, the team is exploring the use of Redux Toolkit. However, it is deemed necessary to investigate whether Redux Toolkit provides a feasible solution for persisting data within the application.
