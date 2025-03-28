---
permalink: /
author_profile: true
redirect_from: 
  - /about/
  - /about.html
  - /about
---

Hi, I’m Jake 👋 — I’m currently a Research Scientist at the [Max Planck Institute of Animal Behavior](https://www.ab.mpg.de/), where I work at the intersections of AI, data science, and animal behavior.

I build interpretable and scalable machine learning tools — often grounded in modern AI and deep learning — to study animal behavior across both lab and field settings. I develop methods that draw from computer vision, probabilistic programming, self-supervised learning, and Bayesian causal inference, with the goal of measuring and making sense of behavioral data.

My work is deeply interdisciplinary. I collaborate with physicists, neuroscientists, field biologists, and engineers to design end-to-end pipelines that span experimental design, data collection, and computational analysis.

I’m particularly interested in AI systems that go beyond prediction — tools that support scientific inference by uncovering mechanisms, testing hypotheses, and explaining the structure and dynamics of complex systems. While much of my work focuses on behavior, I’m broadly motivated by questions at the interface of data, theory, and explanation across the natural sciences.

# Projects

## 🦗 **Collective Motion in Locusts**  
Statistical and Bayesian modeling used to test predictions from a mechanistic model of collective behavior in swarming locusts. This work combines field observations, laboratory experiments, and a virtual reality (VR) setup to study how individual locusts respond to social cues. The findings challenge classical self-propelled particle models by showing that locusts do not align with neighbors in the way those models assume. Instead, collective motion emerges from a minimal cognitive framework, where individuals rely on internal consensus dynamics and neural representations of neighbor bearing — rather than simple rules like alignment.  
🔗 [Publication](https://www.science.org/doi/10.1126/science.adq7832) | [Perspective](https://doi.org/10.1126/science.adw0733) | [Feature Article](https://www.campus.uni-konstanz.de/en/science/scientists-rewrite-the-rules-of-swarming-locusts) | [Model Code](https://github.com/jgraving/sayin_locust_mixture_model)  

**📄 Citation:**
> Sayin, S., Couzin-Fuchs, E., Petelski, I., Günzel, Y., Salahshour, M., Lee, C.-Y., **Graving, J.M.**, Li, L., Deussen, O., Couzin, I.D., et al. (2025). *The behavioral mechanisms governing collective motion in swarming locusts.* **Science**, 387(6737), 995–1000. [https://doi.org/10.1126/science.adq7832](https://www.science.org/doi/10.1126/science.adq7832)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 85%; max-width: 100%; margin: 1em auto;">
  <iframe src="https://www.youtube.com/embed/oBJnY4HKmeY" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
          frameborder="0" allowfullscreen>
  </iframe>
</div>

## 🛸 **Quantifying Group Movement Using Drones and AI**  
Computer vision methods used to extract 3D movement and environmental data from drone footage of free-ranging animal groups in the wild. This project combines aerial video with deep learning–based detection and tracking to reconstruct the fine-scale behavior of entire groups, along with detailed topography of their surroundings. The pipeline enables non-invasive, scalable observation of social interactions and decision-making in complex natural environments — bridging the gap between lab-based tracking and real-world animal ecology.  
🔗 [Code on GitHub](https://github.com/benkoger/overhead-video-worked-examples) | [Publication](https://besjournals.onlinelibrary.wiley.com/doi/10.1111/1365-2656.13904) | [Press Release](https://www.biologie.uni-konstanz.de/fachbereich/aktuelles/details/observing-group-living-animals-with-drones-and-computer-vision/) | [Feature Article](https://www.campus.uni-konstanz.de/en/science/observing-group-living-animals-with-drones-and-computer-vision) | [HerdHover Project](https://herdhover.com/)  

**📄 Citation:**
> Koger, B., Deshpande, A., Kerby, J.T., **Graving, J.M.**, Costelloe, B.R., & Couzin, I.D. (2023). *Quantifying the movement, behaviour and environmental context of group-living animals using drones and computer vision.* **Journal of Animal Ecology**, 92(7), 1498–1515. [https://doi.org/10.1111/1365-2656.13904](https://besjournals.onlinelibrary.wiley.com/doi/10.1111/1365-2656.13904)

<img src="https://raw.githubusercontent.com/jgraving/jgraving.github.io/master/files/images/tracks_on_map_observation088.png" alt="Animal Tracks on Map" style="width:100%; margin-top:10px;">

## 🐟 **Vortex Phase Matching in Schooling Fish**  
This study tested predictions from robot experiments using deep learning-based pose estimation to measure schooling fish behavior. Initially, we used robotic models to simulate vortex phase matching, a strategy for energy-efficient movement in groups. Then, we validated the predictions by measuring real fish with deep learning-based pose estimation. The results provide insight into the dynamics of collective motion, highlighting energy optimization strategies both in fish and in robotic systems designed to mimic their behavior.  
🔗 [Publication](https://www.nature.com/articles/s41467-020-19086-0) | [Press Release](https://www.uni-konstanz.de/en/university/news-and-media/current-announcements/news-in-detail/roboter-helfen/)  

**📄 Citation:**
> Li, L., Nagy, M., **Graving, J.M.**, Bak-Coleman, J., Xie, G., & Couzin, I.D. (2020). *Vortex phase matching as a strategy for schooling in robots and in fish.* **Nature Communications**, 11, Article 5408. [https://doi.org/10.1038/s41467-020-19086-0](https://www.nature.com/articles/s41467-020-19086-0)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 85%; max-width: 100%; margin: 1em auto;">
  <iframe src="https://www.youtube.com/embed/J4T4hi8RO7s" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
          frameborder="0" allowfullscreen>
  </iframe>
</div>


## 🤸‍♂️ **DeepPoseKit**  
A software toolkit for fast and robust animal pose estimation using deep learning. DeepPoseKit leverages deep learning models to estimate the posture of animals from video footage, enabling precise tracking of movement and behavior across a wide range of species. The toolkit is designed to be both accurate and fast, with the ability to learn from minimal data.  
🔗 [Code on GitHub](https://github.com/jgraving/DeepPoseKit) | [Publication](https://elifesciences.org/articles/47994) | [Feature Article](https://www.campus.uni-konstanz.de/en/science/new-method-improves-measurement-of-animal-behaviour-using-deep-learning)  
📰 Featured in: [Quanta Magazine](https://www.quantamagazine.org/to-decode-the-brain-scientists-automate-the-study-of-behavior-20191210/) | [Nature Methods](https://doi.org/10.1038/s41592-019-0678-2) | [Nature News & Views](https://doi.org/10.1038/d41586-019-02942-5)  

**📄 Citation:**
> **Graving, J.M.**, Chae, D., Naik, H., Li, L., Koger, B., Costelloe, B.R., Couzin, I.D. (2019). *DeepPoseKit, a software toolkit for fast and robust animal pose estimation using deep learning.* **eLife**, 8, e47994. [https://doi.org/10.7554/eLife.47994](https://elifesciences.org/articles/47994)

<img src="https://raw.githubusercontent.com/jgraving/jgraving.github.io/master/files/images/Figure1video1.gif" alt="Swarm Pose" style="width:100%; margin-top:10px;">


## 🐦 **Automated Barcode Tracking in Birds**  
Development of a low-cost, scalable system for tracking individual birds using backpack-mounted, machine-readable barcodes.  
This approach enabled automated identification, spatial tracking, and orientation detection in captive zebra finches, supporting the study of fine-scale behavior, social interactions, and network structure over extended timescales. The system integrates hardware, computer vision software, and custom code to process data efficiently and safely across entire groups.  
🔗 [Publication](https://doi.org/10.1111/2041-210X.13005)  

**📄 Citation:**
> Alarcón-Nieto, G., **Graving, J.M.**, Klarevas-Irby, J.A., Maldonado-Chaparro, A.A., Mueller, I., & Farine, D.R. (2018). *An automated barcode tracking system for behavioural studies in birds.* **Methods in Ecology and Evolution**, 9(6), 1536–1547. [https://doi.org/10.1111/2041-210X.13005](https://doi.org/10.1111/2041-210X.13005)

<div style="text-align: center;">
  <video width="85%" controls>
    <source src="https://github.com/jgraving/jgraving.github.io/raw/master/files/videos/zebra_finches_tracked.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## 🕷 **Navigation in Whip Spiders**  
Field and lab studies of spatial behavior and sensory integration in amblypygids (whip spiders), revealing their capacity for goal-directed navigation in complex, light-deprived environments.  
These experiments used radio telemetry, behavioral tracking, and sensory manipulation to study how olfactory and tactile cues — primarily from the antenniform legs — support navigation, even in the absence of vision.  
🔗 [Journal of Experimental Biology (2017)](https://doi.org/10.1242/jeb.149823) | [Journal of Comparative Physiology A (2017)](https://doi.org/10.1007/s00359-017-1169-5) | [Frontiers in Behavioral Neuroscience (2016)](https://doi.org/10.3389/fnbeh.2016.00047)  

**📄 Citations:**
> **Graving, J.M.**, Bingman, V.P., Hebets, E.A., & Wiegmann, D.D. (2017). *Development of site fidelity in the nocturnal amblypygid, Phrynus marginemaculatus.* **Journal of Comparative Physiology A**, 203, 313–328. [https://doi.org/10.1007/s00359-017-1169-5](https://doi.org/10.1007/s00359-017-1169-5)  
>  
> Bingman, V.P., **Graving, J.M.**, Hebets, E.A., & Wiegmann, D.D. (2017). *Importance of the antenniform legs, but not vision, for homing by the neotropical whip spider Paraphrynus laevifrons.* **Journal of Experimental Biology**, 220, 885–890. [https://doi.org/10.1242/jeb.149823](https://doi.org/10.1242/jeb.149823)  
>  
> Wiegmann, D.D., Hebets, E.A., Gronenberg, W., **Graving, J.M.**, & Bingman, V.P. (2016). *Amblypygids: Model organisms for the study of arthropod navigation mechanisms in complex environments?* **Frontiers in Behavioral Neuroscience**, 10:47. [https://doi.org/10.3389/fnbeh.2016.00047](https://doi.org/10.3389/fnbeh.2016.00047)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 85%; max-width: 100%; margin: 1em auto;">
  <iframe src="https://www.youtube.com/embed/6hY8X-qwyiU" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
          frameborder="0" allowfullscreen>
  </iframe>
</div>

<!-- 
Optional additional gifs:
<img src="https://raw.githubusercontent.com/jgraving/jgraving.github.io/master/files/images/zebra.gif" alt="Zebra Pose Estimation" style="width:25%;">
<img src="https://raw.githubusercontent.com/jgraving/jgraving.github.io/master/files/images/locust.gif" alt="Locust Pose Estimation" style="width:25%;">
-->
