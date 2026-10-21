<div align="center">
  <img style="width: 30%;" src="./files/pet_finder.jpg" alt="Apawcalyptic Partners">  
  
  # **APAWCALYPTIC PARTNERS**

  ## **DESCRIPTION**
  "Apawcalyptic Partners" is a web application that draws inspiration from one of my previous projects, "Missing Cats of America" (MCOA). Unlike MCOA, which focused on people posting their missing pets, "Apawcalyptic Partners" displays real-life data sourced directly from shelters across the United States.

  COLOR PALLETE            |  DEMO
:-------------------------:|:-------------------------:
<img style="width: 100%;" src="./files/Apawcalyptic Partners.png" alt="Color Codes">   |  <img style="width: 100%;" src="./files/demo.gif" alt="DEMO"> 
</div>

## **KEY FEATURES:**

 1. **HOMEPAGE:**
    - Lists out all of the animals that are currently in shelters, with listing out 20 animals for each page.
    - Each profile includes details such as name, size, breed, and if they have been around other animals or children.
    - Users can click on any animal to view alot more details about the animal and its location.

2. **LOCAL:**
   - Lists out the 100 recent postings of animals in shelters near you.
   - For users without a VPN, the application displays animals available for adoption within the users vicinity.

3. **SEARCH:**
   - Looking for a specific type of pet? Our search functionality allows users to filter by the species of the users choice.
   - The user has the choice of searching for a dog, cat, rabbit, horse, bird, barnyard animal, any small animal and other types of species.

4. **DONATE:**
   - This functionallity is a mock donation page used to simulate a donation towards the website. This part of the page is NOT real and will NOT take money from the user
   - The user can choose their price of however much they would like to donate.
   - They can choose their payment method of paypal or dogecoin.
   - When the user presses donate, they will be brought to a thank you page where the user can redirect to the homepage to continue to view the animals. 

5. **INSPIRATION**
   - The biggest inspiration for this project was the [Missing Cats of America](https://github.com/RJay-Pickering/Missing-Cats-of-America) project that I did for a project at [Base Camp Coding Academy](https://basecampcodingacademy.org/).

## **HOW TO USE (Visual Studio Code)**
1.  Install [Python](https://www.youtube.com/watch?v=gTcKMLznTcI) and [Django](https://www.youtube.com/watch?v=8JBdPDkKMiA) to your computer
2.  Download [Visual Studio Code](https://www.youtube.com/watch?v=HxJXKFxhah4)
3.  Install the extentions "Python" by Microsoft and "Django" by Baptiste Darthenay
4.  clone this repo
5.  Open the project
6.  In the terminal, open the python shell --- `python manage.py shell`
7.  Import the get_random_secret_key() function --- `from django.core.management.utils import get_random_secret_key`
8.  Generate the Secret Key in the Terminal using the get_random_secret_key() function --- `print(get_random_secret_key())`
9.  Copy and Paste the Key into your SECRET_KEY variable in the settings.py
10. Exit out of the python shell
11. In the terminal, run the project through the terminal --- `python manage.py runserver`
12. Go to [localhost](http://127.0.0.1:8000/) through the browser to view the project running

## **LICENSE**
BSD 3-Clause License
