---
layout: about

title: about

permalink: /

subtitle: Visiting Student, <a href='https://eecs.berkeley.edu/'>Computer Science, UC Berkeley</a> · <a href='https://ai.ucas.ac.cn/'>School of Artificial Intelligence, UCAS</a>.

profile:
  align: right

  image: prof_pic.jpg # fallback when `portraits` is empty

  image_circular: false # crops the image to make it circular

  # Stacked photo prints; the first one is shown in front by default.
  # Clicking opens the same viewer as the photography page, captioned
  # "date, place" like the photos there.
  portraits:
    - image: portraits/beijing.jpg
      alt: Yuze Zhu in sunglasses beneath golden ginkgo trees
      date: November 2024
      place: Beijing
    - image: portraits/berkeley.jpg
      alt: Yuze Zhu in front of Sather Tower under a blue sky
      date: September 2026
      place: UC Berkeley, California
    - image: portraits/hangzhou.jpg
      alt: Yuze Zhu holding a camera up to the face on a school sports field
      date: October 2021
      place: Hangzhou No.2 High School, Hangzhou

hero_links:
  - label: Email
    icon: fas fa-envelope
    url: mailto:yuzezhu141@gmail.com

  - label: GitHub
    icon: fab fa-github
    url: https://github.com/sunrise-yuze
    external: true

  - label: Google Scholar
    icon: ai ai-google-scholar
    url: https://scholar.google.com/citations?user=xCZdP8wAAAAJ&hl=en
    external: true

selected_papers: true # includes a list of papers marked as "selected={true}"

social: false # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items

  scrollable: true # adds a vertical scroll bar if there are more than 3 news items

  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false

  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items

  limit: 3 # leave blank to include all the blog posts
---

I am a fourth-year undergraduate student at the School of Artificial Intelligence, University of Chinese Academy of Sciences (UCAS). I am currently a visiting student at UC Berkeley, working at [Berkeley AI Research (BAIR)](https://bair.berkeley.edu/), advised by [Trevor Darrell](https://people.eecs.berkeley.edu/~trevor/) and [Roei Herzig](https://roeiherz.github.io/).

My long-term goal is to develop robots with **physical and action intuition**, enabling fast and precise manipulation through System 1. I am interested in learning **spatially grounded representations** of 3D structure, physical dynamics, and action, and bridging these capabilities with System 2 reasoning and planning to enable generalization across tasks and environments. I am currently **seeking a PhD position starting in Fall 2027**, and am happy to discuss potential research fit and collaboration opportunities.

Beyond research, I am a passionate photographer. I grew up in **Hangzhou**, spent three years studying in **Beijing**, and am currently based in **Berkeley, California**. I enjoy meeting people from different cultures and making friends around the world. If you would like to chat about research, daily life, or anything related to Chinese culture, please feel free to [reach out](mailto:yuzezhu141@gmail.com). Emails from anywhere are warmly welcome!

<div class="section-head">
  <h2 class="home-section-title" id="experience">Experience</h2>
  <a class="section-more" href="{{ '/assets/pdf/Yuze_Zhu_CV.pdf' | relative_url }}" target="_blank" rel="noopener">full CV <span aria-hidden="true">&#8599;</span></a>
</div>

<div class="home-experience">
  <article class="exp-item">
    <div class="exp-logo-tile">
      <img src="{{ '/assets/img/berkeley_logo.png' | relative_url }}" alt="UC Berkeley logo" loading="lazy" />
    </div>
    <div class="exp-main">
      <div class="exp-row">
        <h3 class="exp-title"><a href="https://bair.berkeley.edu/" target="_blank" rel="noopener">Berkeley AI Research (BAIR)</a> &middot; UC Berkeley</h3>
        <span class="exp-date">Aug 2026 - Present</span>
      </div>
      <div class="exp-meta">Berkeley, California &middot; Visiting Student &middot; Advised by <a href="https://people.eecs.berkeley.edu/~trevor/" target="_blank" rel="noopener">Trevor Darrell</a> and <a href="https://roeiherz.github.io/" target="_blank" rel="noopener">Roei Herzig</a></div>
      <p class="exp-desc">
        Investigating learned representations in <strong>World Action Models (WAMs)</strong>, with a focus on how task-relevant information emerges and supports generalization and adaptation in robotic manipulation. Also exploring <strong>human-video in-context learning</strong>, studying how representations from demonstrations can be aligned with the robot's current state to guide future video and action generation.
      </p>
    </div>
  </article>

  <article class="exp-item">
    <div class="exp-logo-tile">
      <img src="{{ '/assets/img/fiveages_logo.png' | relative_url }}" alt="FiveAges logo" loading="lazy" />
    </div>
    <div class="exp-main">
      <div class="exp-row">
        <h3 class="exp-title">FiveAges (Embodied AI Startup) &amp; CASIA</h3>
        <span class="exp-date">Mar 2026 - Aug 2026</span>
      </div>
      <div class="exp-meta">Beijing, China &middot; Algorithm Intern &middot; Advised by <a href="https://yanrockhuang.github.io/" target="_blank" rel="noopener">Yan Huang</a> and Liang Wang</div>
      <p class="exp-desc">
        Co-developed <strong>BridgeVLA++</strong>, a memory-augmented Vision-Language-Action framework for generalizable 3D manipulation, and led its simulation and real-robot evaluation; co-first-authored the manuscript <strong>submitted to IEEE TPAMI</strong>.
      </p>
    </div>
  </article>

  <article class="exp-item">
    <div class="exp-logo-tile">
      <img src="{{ '/assets/img/casia_logo.png' | relative_url }}" alt="CASIA logo" loading="lazy" />
    </div>
    <div class="exp-main">
      <div class="exp-row">
        <h3 class="exp-title">
          <a href="http://www.ia.cas.cn/" target="_blank" rel="noopener">State Key Laboratory of Multimodal AI Systems, CASIA</a>
        </h3>
        <span class="exp-date">Jul 2025 - Jan 2026</span>
      </div>
      <div class="exp-meta">Beijing, China &middot; Research Intern &middot; Advised by Junyu Gao and Changsheng Xu</div>
      <p class="exp-desc">
        Developed a closed-loop self-correction framework for continuous <strong>Vision-Language Navigation (VLN)</strong> using world-model foresight and environmental feedback, and led the experimental implementation and evaluation on R2R-CE and RxR-CE; resulted in a second-author paper <strong>accepted at ICML 2026</strong>.
      </p>
    </div>
  </article>
</div>
