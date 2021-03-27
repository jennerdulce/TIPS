# Auth-API

## ACL

- acl is a middleware that checks to see if a user has permissions or capabilities

- acl middleware allows the developer to control who has access to certain routes

- in this assignment, it correlates to the 'role' property a user has.

## Basic

- is used to verify a user upon sign in

- it starts off by decoding a username and password, separating the information and verifying it to a user that has already been saved in the database.

- Basic is what compares a users password

- if the password matches to the password stored in the database, then the information is retrieved

## Bearer

- is another layer of security

- a token is first made when a user is made/signs in

- sometimes, tokens are needed to access certain routes

- a user has to 'bear' a token to enter this route

## General

### Reflection

- this is a lot going on in this lab and a lot of it is still not entirely clear to me BUT i am able to see whats going on

- there are AUTH routes that first create a user, token, and assign the user permissions

- these middlewares are then used to authenticate the v2 routes to add a layer of security

- to access these routes, the user has to have a token, a permission, or both

- the user passes this information through headers and put through the auth middleware