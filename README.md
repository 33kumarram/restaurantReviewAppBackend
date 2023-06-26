# Restaurant Review App Backend

  [![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blue&?style=plastic&logo=appveyor)](https://opensource.org/license/MIT)



## Table Of Content

- [Description](#description)
- [Deployed website link](#deployedWebsite)
- [Installation](#installation)
- [API End Points](#APIEndPoints)
- [Contributing](#contribution)

- [GitHub](#github)
- [Contact](#contact)
- [License](#license)




![GitHub repo size](https://img.shields.io/github/repo-size/33kumarram/NodeOtpLoginApi?style=plastic)

  ![GitHub top language](https://img.shields.io/github/languages/top/33kumarram/restaurantReviewAppBackend?style=plastic)



## Description

  This repository contains the backend code for the Restaurant Review App, which provides functionality for managing restaurants, reviews, and analytics.
  
  
  
 <strong>Features :</strong>
 
  <strong>1. List of Restaurants:</strong> When a user opens the app, they can view a list of restaurants, including their names and addresses.
    
  <strong>2. Restaurant Detail Screen:</strong> Clicking on a restaurant in the list takes the user to the restaurant detail screen. Here, they can see the name, address, and description of the restaurant.
    
  <strong>3. Reviews:</strong> The restaurant detail screen also displays a list of reviews that the restaurant has received. Users can submit their own reviews anonymously using the provided text box.
     
  <strong>4. Admin Analytics:</strong> On the admin side, the app provides analytics features for admin users to gain insights into the platform's usage and performance.









## Installation

1. Clone the repository:

       git clone https://github.com/33kumarram/restaurantReviewAppBackend.git


2. Install dependencies:

       cd restaurantReviewAppBackend

       npm install


3. Set up environment variables:
  
      You will need to create a .env file in the root of the project directory, containing the following environment variables:

        MONGODB_URI= your MongoDB connection string

        JWT_SECRET=a secret key for JSON Web Token (JWT) encryption

        PORT = Port on which you want to run the server

4. Finally, start the server:

     npm start

     The server should now be running on port mentioned in the .env file





    RestaurantReviewAppBackend is built with the following tools and libraries: <ul><li>Node js </li><li>Express js </li><li>MongoDB </li>


## APIEndPoints
    <strong>'/restaurants/list/:pageNo'</strong>: Retrieve a list of restaurants on a specific page.
  
    <strong>'/restaurants/totalpages'</strong>: Retrieve the count of pages in restaurent list.
  
    <strong>'/restaurants/add'</strong>: To add new restaurant details.
  
    <strong>'/restaurants/listforadmin/:pageNo'</strong>: Retrive list of restaurants on specific page with review count for analytics purpose.


     <strong>'/reviews/:restaurantId'</strong>: Retrive reviews for a specific restaurant.
   
     <strong>'/reviews/add'</strong>: To add a review for a specific restaurant.


     <strong>'/users/register'</strong>: To register a new user.
   
     <strong>'/users/login'</strong>: To log In.
 

## Contribution
 
  If you would like to contribute to this project, please follow these steps:

    1.Fork the repository

    2.Create a new branch for your changes

    3.Make your changes and commit them with descriptive commit messages

    4.Push your changes to your forked repository

5.Open a pull request to merge your changes into the master branch








## GitHub

<a href="https://github.com/33kumarram"><strong>33kumarram</a></strong>



<a href="https://www.linkedin.com/in/ramesh-kumar-33613a174/">LinkedIn</a></strong></p>


<a href="https://leetcode.com/kumarram/">Leetcode</a></strong></p>





## Contact

Feel free to reach out to me on my email:
rk3790690@gmail.com





## License

[![License](https://img.shields.io/static/v1?label=Licence&message=MIT&color=blue)](https://opensource.org/license/MIT)


