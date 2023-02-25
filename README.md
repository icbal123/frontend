# ConferenceConnect

## Inspiration
After attending various career fairs and applying for countless internships, we found it pretty tedious to have to key in the same details over and over again. We thought that it might be a good idea to streamline this process, making it easier for not only ourselves but also the recruiters. We decided to further expand on the idea and make an app for all networking events, allowing people from all walks of life to be able to meet each other - be it to find potential interns or co-founders for an interesting startup idea.

## What it does
ConferenceConnect, as its name suggests, is an app that allows its users to easily share their details (only those that they wish to share) with others in the same event, as well as to view what others have to offer.

## How we built it
Each of us focused on a specific part of the app. Junius focused more on the Front-end development, coming up with the Figma wireframe as well as almost all of the UI/UX, while Ho Chi worked more on the interactions with the database, authentication and bluetooth features.

In terms of the tech stack:

* App was built with React Native and Nativewind
* All backend APIs (authentication, database, storage) are hosted on Firebase and Firestore

## Challenges we ran into
Getting Bluetooth running on Android with React Native was not really a very pleasant experience, especially with trying to uniquely identify a device since getting the device's own MAC address was basically not allowed.

Experience and conventions from developing in React and tailwindcss did not immediately translate to React Native and Nativewind; new conventions and styles had to be learnt.

## Accomplishments that we're proud of
We were able to finally come up with a sleek mobile app that provides the functionality we effectively intended for it to have.

## What we learned
Modularizing code makes it much easier to test and debug, as well as to make changes when we need to add new features in the future.

## What's next for ConferenceConnect
While Firebase is very good for rapid prototyping and testing, it's not very good for big projects. At the moment, our application is not very scalable (because we're using Firebase and Firestore) and the next big step would be to move our application backend into something more scalable like MongoDB or Supabase.
