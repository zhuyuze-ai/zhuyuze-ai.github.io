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
    - image: portraits/olympic.jpg
      alt: Yuze Zhu seated on fallen ginkgo leaves with a camera in autumn
      date: November 2023
      place: Olympic Forest Park, Beijing
    - image: portraits/hangzhou.jpg
      alt: Yuze Zhu holding a camera up to the face on a school sports field
      date: October 2021
      place: Hangzhou No.2 High School, Hangzhou

hero_links:
  - label: Email
    icon: fas fa-envelope
    url: mailto:yuzezhu141@gmail.com

  - label: CV
    icon: fas fa-file-lines
    url: /assets/pdf/Yuze_Zhu_CV.pdf
    external: true

  - label: Google Scholar
    icon: ai ai-google-scholar
    url: https://scholar.google.com/citations?user=xCZdP8wAAAAJ&hl=en
    external: true

  - label: GitHub
    icon: fab fa-github
    url: https://github.com/sunrise-yuze
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

My long-term goal is to develop robots with **physical and action intuition**, enabling fast and precise manipulation. I am interested in learning **spatially grounded representations** of 3D structure, physical dynamics, and action, and integrating intuitive control with high-level reasoning and planning to enable generalization across tasks and environments. I am currently **seeking a PhD position starting in Fall 2027**, and am happy to discuss potential research fit and collaboration opportunities.

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
      <div class="exp-meta">Berkeley, California &middot; Visiting Undergraduate Researcher &middot; Advised by <a href="https://people.eecs.berkeley.edu/~trevor/" target="_blank" rel="noopener">Trevor Darrell</a> and <a href="https://roeiherz.github.io/" target="_blank" rel="noopener">Roei Herzig</a></div>
      <p class="exp-desc">
        Proposed <strong>HeadLight</strong>, an attention-head-level analysis and adaptation framework that identifies two families of functionally specialized heads in <strong>World-Action Models (WAMs)</strong>, for interaction targeting and motion modeling. Developed a targeted adaptation method based on these heads that outperforms full fine-tuning and LoRA in manipulation generalization. Led the project from initial exploration through manuscript submission, coordinating collaborators, cross-architecture experiments, and real-robot evaluations; <strong>first-authored</strong> the manuscript, currently under review.
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
      <div class="exp-meta">Beijing, China &middot; Research Intern &middot; Advised by <a href="https://yanrockhuang.github.io/" target="_blank" rel="noopener">Yan Huang</a> and Liang Wang</div>
      <p class="exp-desc">
        Led the design and implementation of <strong>BridgeVLA++</strong>'s spatio-temporal memory: spatial memory for recovering geometrically aligned scene context under occlusion, and temporal memory integrating initial-scene references, recent interactions, and long-term sub-goals. Conducted simulation and real-robot evaluations, demonstrating state-of-the-art performance across five manipulation benchmarks; co-first-authored the manuscript, <strong>under review at IEEE TPAMI</strong>. Also co-developed <strong>M3D-VLA</strong>, contributing to its spatially grounded memory architecture and real-robot validation for history-aware manipulation (second author).
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
        Co-developed <strong>SC&sup2;-WM</strong>, a self-correcting world model for closed-loop <strong>Vision-and-Language Navigation</strong> with foresight-guided feedback. Proposed the core idea of leveraging next-step environmental observations as self-supervised signals for online world-model adaptation at test time, and conducted the majority of simulation experiments, validating navigation performance and generalization in unseen environments; resulted in a second-author paper at <strong>ICML 2026</strong>.
      </p>
    </div>
  </article>
</div>
