# git_userProfile

First of all, apologies for the delay. This is very much still a WIP. 
I will be cleaning this up & making it more attractive over the next few days, if you would like to be updated with the final release, please let me know & I can have have the updated link sent for review.

# To Test:
- git clone https://github.com/Kay2dan/git_userProfile.git
- yarn install
    or
  npm install
- yarn run start-dev
    or
  npm run start-dev
  
# Tech:
- React, ReactDOM
- Immutable.js
- Axios
- Webpack2
- Jest (to be used)
- Babel

# Notes:
- As requested here is the breakdown of the time. I am enjoying using the service 'Toggl' for keeping track of my two projects, learning class & research daily. As per the service here is the breakdown:
  - I spent a total of 18:57min on this over the period of 3 days.
  - Approx. 3 - 4 hrs spent on setting up the build system (webpack, bable, dev-server, npm packages etc).
  - 1hr on reading & researching about Heroku.
  - 1:35min on CSS.
  - Remaining time on the React code. The sort function took the most time at over 4 hours & counting... :!

# Issues:
- Sort is buggy. It works the first time, not the second. To be fixed.
- Filter is based on full string, not half string so please insert the full value of the property to search for. To be extended with Regex.
- Tests not done as I haven't had the time to incorporate it.
- The code can certainly be more cleaner with the usage of HO functions, however, towards the end, I had to rush to meet the promised deadline to Nicholas.
- While initially I started with wanting to go as much FP as possible, however, I had to break the convention as I was running short of time, hence you may notice the reference to external variables within the functional programming calls. To be fixed & cleaned up.
- CSS can take time and I quickly mocked up the presentation at the end. 
