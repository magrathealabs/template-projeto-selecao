# Birthdays

This is my solution to the full-stack challenge birthdays, for Speakap.

## Install and Run

To install dependencies:
```bash
npm run setup
```

And to run the project :
```bash
npm run dev
```

## The Solution

My solution was inplemented using `Node.js + Express` on the back-end (./api) and `React.js + Redux + React Router` on the front-end (./client);

## Api routes

### `GET /birthdays`

Returns the birthdays in an specific week of an year. It expects week and year as query params, and assumes the current week or year if either is missing.

```json
[
  {
    "date": "2019-07-07T21:17:33.228Z",
    "birthdays": [
      "Aneesa Ashley"
    ]
  },
  {
    "date": "2019-07-08T21:17:33.228Z",
    "birthdays": []
  },
  {
    "date": "2019-07-09T21:17:33.228Z",
    "birthdays": [
      "Zoha Baird",
      "Abdulrahman Irvine",
      "Mikaela Forrest",
      "Juanita Brett"
    ]
  },
  {
    "date": "2019-07-10T21:17:33.228Z",
    "birthdays": [
      "Amarah Carter"
    ]
  },
  {
    "date": "2019-07-11T21:17:33.228Z",
    "birthdays": [
      "Simrah Tran"
    ]
  },
  {
    "date": "2019-07-12T21:17:33.228Z",
    "birthdays": [
      "Zavier Wilkerson",
      "Everett Mccartney"
    ]
  },
  {
    "date": "2019-07-13T21:17:33.228Z",
    "birthdays": []
  }
]
```

### `POST /birthdays`

Adds a new user to the backend.

Expected body:
```json
{
  "date": "1996-04-16T03:00:00.000Z",
  "name": "Leonardo Kalyn"
}
```
If successfull, it will return the same object.

### `POST /birthdays/:date`

Returns the lists of users with same age and same birthday from the given date.

Expected response:
```json
{
  "sameBirthday": [
    "Abubakar Andersen",
    "Axel Dawson",
    "Humera Patton",
    "Leonardo Kalyn"
  ],
  "sameAge": [
    "Skye Cox",
    "Kaleb Guerra",
    "Marco Kearns",
    "Jordanna Marquez",
    "Kiana Clements",
    "Leonardo Kalyn",
    "Tariq Mccarty",
    "Hadassah Bowen",
    "Murphy Stanley",
    "Amalie Mccartney"
  ]
}
```
