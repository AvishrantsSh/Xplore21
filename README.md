# Project Vision
## Introduction
**Surveillance** means safety. Despite so much surveillance, the crime rates are increasing. The problem lies in the fact that inspecting several hundreds and thousands of videos is very laborous and time-intensive task. Only after a crime is committed, these footages are inspected to ***find the crime scenes evidence***, which proves to be highly inefficient considering the massive amount of footages. This manual task provides evidence in court but is rarely used to ***prevent crime or react to it in real-time***.    
<br>

## 🔭 &nbsp; About this Project
In this project, we aim to develop a **real-time crime detection technology** that can be integrated with any security system, to ensure public safety through **visual crowd surveillance**.<br>
We have devised a complete software solution for safety and surveillance where we convert these CCTVs from an evidence collection to a crime prevention and detection tool to ensure safety and security.<br> This real-time crime detection technology is integrated with security systems and Desktop Application to get push-in notifications in case any suspicious activity is discovered.
The system will detect and simultaneously alert any violent activity captured by the camera. <br>The technologies encompasses domains of Computer Vision and Deep Learning models like **CNN, R-CNN, LSTM**. The dataset consists of 500+ videos scraped off internet and categorized into ***violent and non-violent*** activities. 
<br>

## 🛠 &nbsp;Tech Stack
![Tensorflow](https://img.shields.io/badge/TensorFlow%20-%23FF6F00.svg?&style=for-the-badge&logo=TensorFlow&logoColor=white)&nbsp;
![Keras](https://img.shields.io/badge/Keras%20-%23D00000.svg?&style=for-the-badge&logo=Keras&logoColor=white)&nbsp;
![Django](https://img.shields.io/badge/django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white)&nbsp;
![Node.js](https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white)&nbsp;<br>
![AWS](https://img.shields.io/badge/AWS%20-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white)&nbsp;
![Python](https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white)&nbsp;
![HTML](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![CSS](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)&nbsp;
![Javascipt](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
<br>

## 💼 &nbsp; Testing
Our source code can be tested and contributed to using the following steps:
### 1. Website
Execute the following sequence of code to start contributing and testing:
- Open the directory labelled Website using the command
    ```sh
    cd Website
    ```

- Install all the dependencies using
    ```sh
    pip3 install -r requirements.txt
    ```

- Run the migrations using the following commands
    ```sh
    python3 manage.py makemigrations
    ```
    ```sh
    python3 manage.py migrate
    ```

- Run the Django server by
    ```sh
    python3 manage.py runserver
    ```

<br>

*Note :*  In case you encounter errors during migrations, make sure that you have access rights to *db.sqlite3* file. You can use the following command to rectify permission denied error
```sh
chown *username* db.sqlite3
```

Run the migrations again to continue.


### 2. Desktop App
Being built on top of Node.js, it is fairly easy to set-up the environment. Follow the steps to safely configure the system
- From the parent folder directory, execute the following command
    ```sh
    npm install
    ```

- Once finished, the application can be run using
    ```sh
    npm start
    ```

- The desktop app has two modes of operation: **Offline** and **Online**. By default the app function in **Online** mode. To make it work in **Offline** mode, use the menu button provided on top of UI and select Offline mode.
<br><br>
<p align="center">
    <img src="ss.png" width="80%">
    </p>
    <br><br>

##  ✍️ &nbsp; Current Progress
We tried and tested various architectures for this project. A brief summary and stats for each is given below:
1. **Customised CNN Model**: The customised CNN model with optimised parameters performed well on the training and sufficiently good in the test dataset. The architecture is currently being used by the website and test.ipynb file.

    - Accuracy on training: 0.7990
    - Loss on training: 0.4292
    - Val_loss: 0.7605
    - Val_accuracy: 0.6680
    - Optimizer: Adam
    - Loss: BinaryCrossEntropy
    - Epochs: 50
    - steps_per_epoch: 50 
    <br><br>

    <p align="center">
    <img src="Machine Learning/stats/CustomisedCNN.png">
    </p>
    <br><br>

2. **VGG Net**: VGGNet Architecture displayed an accuracy of 60% on training and 55% on testing dataset.
    - Testing Accuracy: 0.5513
    <br><br>
    <p align="center">
    <img src="Machine Learning/stats/VGGNet.png">
    </p>
    <br><br>

3. **AlexNet**: AlexNet showed accuracy of 57% on training and a similar accuracy on the testing dataset. 
    - Testing Accuracy: 0.5729
    <br><br>

    <p align="center">
    <img src="Machine Learning/stats/AlexNet .png">
    </p>

    <br><br>

4. **Inception+CustomisedCNN**: Using transfer learning of Inception Architecture and passing it to CustomisedCNN trained the model with satisfactory results.
    - Training_accuracy: 89%
    - Validation_accuracy: 76%
    - Epochs: 30
    - Steps per Epoch: 100
    - Optimizer: RMSprop with LR 0.0001
    - Loss: Binarycrossentropy
    <br><br>
    <p align="center">
    <img src="Machine Learning/stats/CustomisedInceptionV3+CNN.png">
    </p>
    <br>

### ⚙️ &nbsp; Ultimate Objective
The model uses the technique of Multiple Object Detection with Localization tracking the movement of people and then categorizing it into violent or non-violent behavior. Our proposed solution will ensure Public Safety and security without any human toil with an instant alert to the concerned authorities. Through ***Crowd Monitoring and Behavioral Analysis*** our solution aims to evoke the sense of security in men and women. The constant rise of criminal activities, their unexpectedness, and scope of harm that can be inflicted can be exponentially reduced through our proposed system. 

*Link to current protoytpe* : [Click Here](http://ec2-18-206-46-76.compute-1.amazonaws.com:8000/)


## Link to Desktop Apps
| Platform&nbsp;&nbsp;&nbsp;    | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Link &nbsp;&nbsp;&nbsp;&nbsp;|
| ----------- | ---- |
| Windows (.exe) |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Link](https://github.com/AvishrantsSh/Xplore21/releases/download/v1.1.1/xplore-Setup-1.1.1.exe)|
| Linux (.AppImage) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Link](https://github.com/AvishrantsSh/Xplore21/releases/download/v1.1.1/xplore-1.1.1.AppImage) |
| Mac (.dmg) |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Link](https://github.com/AvishrantsSh/Xplore21/releases/download/v1.1.1/xplore-1.1.1.dmg) |

<br>

## Custom Build
If you want to create the desktop app for a different platform or a different extension like **.deb**, **.rpm**, use the following command from parent folder
```sh
electron-forge make
``` 
