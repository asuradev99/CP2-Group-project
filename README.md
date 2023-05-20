# Shape Shooter
Shape Shooter is a game inspired by diep.io as a 2d top-down perspective online shooter. The objective of this game is to gain 100 money to buy the Biden button (Joe Biden President of the United States).

# How to play
Just click this link \E2\86\92 https://cooltriangle.duckdns.org

Its probably down because we can't run the server forever.

## Controls
| buttons         | actions    |
|-----------------+------------|
| w / up arrow    | move up    |
| s / down arrow  | move down  |
| a / left arrow  | move left  |
| d / right arrow | move right |
| Mouse 1         | shoot      |

## Gameplay Mechanics
### Points and Money
Points in Shape Shooter are a representation of how much you have achieved inside the game. The more things you do, the more points you get, it never goes down. These will show on the big leaderboard on the right of the UI.

Money on the other hand is the currency you can use to buy upgrades. There are 10 main upgrades in this game which can be purchased infinitely to upgrade stats. 
### Food
Scattered around the 4000x4000 map there is 100 green circles. These represent "food" which you can kill to get points and money.

The small food has less health, but it gives you less money in return than the bigger food.

### Other Players
When battling other players, you may notice that you go faster when going diagonally. This makes it harder to shoot people who are running away, so don't do that. Make those players chase you.

### The Map
There are 4 boundaries on the map in the 4000x4000 area indicated by a white line. You can't go past that.

# Images and Videos
https://user-images.githubusercontent.com/70330869/232074813-a5caac2b-a6ca-489b-8199-4b349447b547.mov

# Guide to Running
If you find yourself in the unfortunate situation of needing to host the server for this, heres what you need to do.

## Download Node.js / npm
Node is needed for running the server for this. If you are on Windows, go to this [link][https://nodejs.org/en/download/current] and download the installer for Windows. If you are on Mac OS you can also do that, or you can follow the next set of instructions

### Using a Package Manager
#### Brew for Mac OS
If you are using brew on MacOS, run the following code:
   brew install node
#### Linux
On most Linux distros, you should be able to install node with a similar command to these:
| Distro           | Command                       |
|------------------+-------------------------------|
| Ubuntu or Debian | `sudo apt install nodejs npm` |
| Fedora           | `sudo dnf install nodejs npm` |
| Arch             | `sudo pacman -Syu nodejs npm` |
| ...              |                               |

## Running the Server
### With Git
If you have `git` installed, just clone the repo and then run it with node:
   git clone https://github.com/asuradev99/CP2-Group-project
   cd CP2-Group-project
   node server
After doing that, it should be running on port 8080.
### Without Git
Click the green "Code" button at the top of this repo, and hit download zip. Extract that zip, and open the terminal in that directory. Then run the following command:
    node server
It should then be running on port 8080.

# Gannt Chart
<img width="2042" alt="Screen Shot 2023-05-03 at 7 51 46 AM" src="https://user-images.githubusercontent.com/70330869/235936209-dae5cb24-80bf-4035-ab84-9dab275bc393.png">


# Members
- ethan: server / client
- steven: server / client (he committed most times, he didn't code the entire thing by himself)
- ayush: code the objects
- alon: code the objects

# todo list
- HPRegen doesn't work
- give player the option to add turrets
- fix money system
- what the hell is inertia supposed to do
