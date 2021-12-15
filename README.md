# Introduction

This <a href="https://blissful-dubinsky-f91211.netlify.app/">website</a> is designed to provide complete information to what is an operating system and what are the different algorithms that supports the operating system.
It was originally designed by our super seniors (Page Replacement algorithm) and is further developed by our seniors (Disk Scheduling algorithm) and us (CPU Scheduling algorithm) and is going to be developed by our juniors (Concurrency and deadlock) in the probable future.
The home page of the website shows what actually an operating system is and a video depicting the same. Further links and directions are provided in the UI itself.
# Algorithms
The content map of the website is as follows:
<ol><li>Page replacement algorithm</li>
	<ul>
	<li>FIFO</li>
	<li>LIFO</li>
	<li>LRU</li>
	<li>OPTIMAL</li>
	<li>RANDOM</li>
	<li>BELADY</li>
	</ul>
<li>Disk scheduling algorithm</li>
	<ul>
	<li>FCFS</li>
	<li>SSTF</li>
	<li>SCAN</li>
	<li>C-SCAN</li>
	<li>LOOK</li>
	<li>C-LOOK</li>
	</ul>
<li>CPU scheduling algorithm</li>
	<ul>
	<li>FCFS</li>
	<li>SJF</li>
	<li>SRJF(preemptive)</li>
	<li>Round Robin</li>
	<li>Priority</li>
	</ul>
<li>Concurrency and Deadlock</li>
YET TO BE IMPLEMENTED...
</ol>



# How to Run our code:
<ol>
<li> Go to link - https://github.com/Atri10/osvirtuallab</li>
<li> Click on the green drop down button named 'Code'</li>
<li> Now click on the 'Download ZIP' to download the zip file of the full code on your machine.</li>
<li> Extract the downloaded file on your desired location.</li>
<li> Run the 'index' file to open the home page of the website on your selected browser. You can now take a tour of the website there itself.</li>
<li> To find the html files of our (CPU Scheduling) algorithm, go to 'CPU_Scheduling' folder in the main extracted folder.</li>
<li> To find all the css and js files, go to 'Assets' folder and further inside 'css' and 'js' folders respectively in the main extracted folder.</li>
</ol>



## CPU- Scheduling:

1. FCFS: First Come First Serve is the full form of FCFS whihc is the easiest and most simple CPU scheduling algorithm.
	Implementing and getting results: Go to 'CPU scheduler-FCFS' by scrolling down on FCFS page. Enter comma separated valid input values for arrival time and burst time to get the full results in the tabular as well as graphical form.
	Location of HTML file: osvirtuallab-master/CPU_Scheduling/FCFS_CPU
	Location of JS file: osvirtuallab-master/Assets/js/CPU_FCFS
2. SJF: The shortest job first(SJF) scheduling is an algorithm which, in simple words, means that the shortest job gets executed first.
	Implementing and getting results: Go to 'CPU scheduler-SJF' by scrolling down on SJF page. Enter comma separated valid input values for arrival time and burst time to get the full results in the tabular as well as graphical form.
	Location of HTML file: osvirtuallab-master/CPU_Scheduling/SJF_CPU
	Location of JS file: osvirtuallab-master/Assets/js/CPU_SJF
3. SRJF: The Shortest Remaining Time First (SRTF) scheduling algorithm, the process with the smallest amount of time remaining until completion is selected to execute.
	Implementing and getting results: Go to 'CPU scheduler-SRJF' by scrolling down on SRJF page. Enter comma separated valid input values for arrival time and burst time to get the full results in the tabular as well as graphical form.
	Location of HTML file: osvirtuallab-master/CPU_Scheduling/SRJF_CPU
	Location of JS file: osvirtuallab-master/Assets/js/CPU_SRJF
4. Round Robin: Round Robin is the oldest, simplest scheduling algorithm, which is mostly used for multitasking.
	Implementing and getting results: Go to 'CPU scheduler-Round Robin' by scrolling down on Round Robin page. Enter comma separated valid input values for burst time and time quantum to get the full results in the tabular as well as graphical form.
	Location of HTML file: osvirtuallab-master/CPU_Scheduling/RoundRobin_CPU
	Location of JS file: osvirtuallab-master/Assets/js/CPU_RR
5. Priority scheduling: Priority Scheduling is a method of scheduling processes that is based on priority. 
	Implementing and getting results: Go to 'CPU scheduler-Priority schduling' by scrolling down on Priority scheduling page. Enter comma separated valid input values for burst time, arrival time and priority to get the full results in the tabular as well as graphical form.
	Location of HTML file: osvirtuallab-master/CPU_Scheduling/Priority_CPU
	Location of JS file: osvirtuallab-master/Assets/js/CPU_Priority

Comparison between algorithms (CPU scheduling) step-by-step:
Step-1: Click on 'Compare' button in the nav bar.
Step-2: Enter comma separated valid input values for arrival time, burst time, priority and time quantum to get comparison of all 5 algorithms on basis of avg turn around time and avg waiting time in tabular as well as graphical form.



# About

Technologies used:
1. Front-end: HTML, CSS, Bootstrap
2. Back-end: Javascript

Code editor used for implementing CPU_Scheduling algorithm: VS Code

# Credits:

## Page Replacement: 
1. Darshan Patel
2. Kunal Kataria
3. Neel Yadav
4. Aashil Shah

## Disk Scheduling:
1. Hansal Shah
2. Jainil Patel
3. Divyansh Mahida
4. Divyansh Jain
5. Rushabh Shah

## CPU Scheduling:
1. Atri Patel
2. Harsh Godhani
3. Jenil Kundaliya
4. Jay Panchal
5. Kunj Manavadariya
6. Harsh Makadiya
