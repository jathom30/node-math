# Crypto Node Calculator

A basic calculator used to roughly calc node roi and compounding dates, earnings, etc

Uses recoiljs for state management and react-query to manage a couple hits to coin gecko's API.

## To get started:

Clone down this repo and run: `yarn && yarn start`

To contribute, open a PR

---

Current build status:
[![Netlify Status](https://api.netlify.com/api/v1/badges/911fa035-a30f-4df6-8dc2-0683b6704dfc/deploy-status)](https://app.netlify.com/sites/relaxed-pike-d1bcb0/deploys)

---

## Features:

### General:

- State is saved to local storage so user sessions are preserved between visits (when using the same browser)
- Total Panel: Accumulated total of all added nodes. Each node card can be added or removed from total panel to create a custom total.

### Card Features:

- Create new
- Delete
- Clone
- Drag and drop (reorder)
- Add/remove from total card

### Token Features

- Search token
- Select token
- Refetch/update current price
- Create custom token price

### Form Features

- Required Fields: Node count, Node cost, and Daily rewards (% or token based)
- Optional Fields: Claim tax, Sales tax, Sales tax, Compound tax, Node fee per month

### Compound Table

- Display days or date (from today) to compound
- See daily, weekly, monthly, or yearly earnings

### Advanced

- Set currency for entire app
- Email support
- Donate crypto to help support our efforts
