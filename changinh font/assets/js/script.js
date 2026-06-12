
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOpenIcon = document.getElementById("menuOpenIcon");
    const menuCloseIcon = document.getElementById("menuCloseIcon");
    const mobileLinks = document.querySelectorAll(".mobile-link");
   


    const toggleMenu = () => {
      mobileMenu.classList.toggle("hidden");
      menuOpenIcon.classList.toggle("hidden");
      menuCloseIcon.classList.toggle("hidden");
    };

    menuToggle.addEventListener("click", toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!mobileMenu.classList.contains("hidden")) {
          toggleMenu();
        }
      });
    });

    const desktopMediaQuery = window.matchMedia ? window.matchMedia("(min-width: 768px)") : null;
    const isDesktopViewport = () => (desktopMediaQuery ? desktopMediaQuery.matches : window.innerWidth >= 768);
    const isElementActiveForViewport = (element) => {
      if (!element) return false;
      const inDesktopTree = Boolean(element.closest("main.desktop-shell"));
      return isDesktopViewport() ? inDesktopTree : !inDesktopTree;
    };
    const deferredVideos = Array.from(document.querySelectorAll("video[data-defer-video]"));

    const hydrateVideo = (video) => {
      if (!video || video.dataset.videoLoaded === "true") return;
      const source = video.querySelector("source[data-src]");
      if (!source || !source.dataset.src) return;
      source.src = source.dataset.src;
      video.dataset.videoLoaded = "true";
      video.load();
    };

    const shouldHydrateImmediately = (video) => {
      const role = video.dataset.videoRole;
      if (role === "hero-desktop") return desktopMediaQuery ? desktopMediaQuery.matches : true;
      if (role === "hero-mobile") return desktopMediaQuery ? !desktopMediaQuery.matches : true;
      return false;
    };

    deferredVideos.forEach((video) => {
      if (shouldHydrateImmediately(video)) {
        hydrateVideo(video);
      }
    });

    const sectionVideos = deferredVideos.filter((video) => video.dataset.videoRole === "section");
    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            hydrateVideo(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "220px 0px" }
      );
      sectionVideos.forEach((video) => videoObserver.observe(video));
    } else {
      sectionVideos.forEach(hydrateVideo);
    }

    if (desktopMediaQuery) {
      const onBreakpointChange = () => {
        deferredVideos.forEach((video) => {
          if (shouldHydrateImmediately(video)) hydrateVideo(video);
        });
      };
      if (typeof desktopMediaQuery.addEventListener === "function") {
        desktopMediaQuery.addEventListener("change", onBreakpointChange);
      } else if (typeof desktopMediaQuery.addListener === "function") {
        desktopMediaQuery.addListener(onBreakpointChange);
      }
    }

    const initCarousel = (carousel) => {
      const slides = Array.from(carousel.children);
      if (slides.length < 2) return;
      const carouselGroup = carousel.closest("[data-carousel-group]");
      const dotsWrap =
        carouselGroup?.querySelector("[data-carousel-dots]") ||
        carousel.parentElement.querySelector("[data-carousel-dots]");
      if (!dotsWrap) return;
      const prevBtn = carouselGroup?.querySelector("[data-carousel-prev]");
      const nextBtn = carouselGroup?.querySelector("[data-carousel-next]");
      const isMarquee = carousel.dataset.carouselMarquee === "true";
      if (isMarquee) {
        dotsWrap.style.display = "none";
        prevBtn?.classList.add("hidden");
        nextBtn?.classList.add("hidden");
        carousel.style.scrollBehavior = "auto";

        const removeClones = () => {
          carousel.querySelectorAll('[data-marquee-clone="true"]').forEach((node) => node.remove());
        };

        const getBaseSlides = () =>
          Array.from(carousel.children).filter((node) => node.getAttribute("data-marquee-clone") !== "true");

        const buildClones = () => {
          removeClones();
          const baseSlides = getBaseSlides();
          if (!baseSlides.length) {
            carousel.__marqueeSetCount = 1;
            return;
          }

          // Always add at least two clone sets to guarantee continuous ticker flow.
          const minSetCount = 2;
          for (let i = 0; i < minSetCount; i += 1) {
            baseSlides.forEach((slide) => {
              const clone = slide.cloneNode(true);
              clone.setAttribute("data-marquee-clone", "true");
              clone.setAttribute("aria-hidden", "true");
              carousel.appendChild(clone);
            });
          }

          // Add one more set for wider viewports where one set may still be too short.
          if (carousel.scrollWidth < carousel.clientWidth * 2.2) {
            baseSlides.forEach((slide) => {
              const clone = slide.cloneNode(true);
              clone.setAttribute("data-marquee-clone", "true");
              clone.setAttribute("aria-hidden", "true");
              carousel.appendChild(clone);
            });
            carousel.__marqueeSetCount = 4; // original + 3 clone sets
          } else {
            carousel.__marqueeSetCount = 3; // original + 2 clone sets
          }
        };

        buildClones();
        carousel.scrollLeft = 0;
        let loopWidth = 1;
        let lastFrameTs = 0;
        let marqueePos = 0;
        const speedPxPerSecond = Number.isFinite(Number(carousel.dataset.carouselSpeed)) && Number(carousel.dataset.carouselSpeed) > 0
          ? Number(carousel.dataset.carouselSpeed)
          : 22;

        const measureLoopWidth = () => {
          const setCount = carousel.__marqueeSetCount || 3;
          loopWidth = Math.max(1, carousel.scrollWidth / setCount);
          if (marqueePos >= loopWidth) {
            marqueePos = marqueePos % loopWidth;
          }
          carousel.scrollLeft = marqueePos;
        };

        const runMarquee = (ts) => {
          if (!lastFrameTs) lastFrameTs = ts;
          const deltaMs = Math.min(64, ts - lastFrameTs);
          lastFrameTs = ts;

          if (loopWidth <= 1) {
            buildClones();
            measureLoopWidth();
          }

          marqueePos += (speedPxPerSecond * deltaMs) / 1000;
          if (marqueePos >= loopWidth) {
            marqueePos -= loopWidth;
          }
          carousel.scrollLeft = marqueePos;
          carousel.__marqueeRaf = requestAnimationFrame(runMarquee);
        };

        if (carousel.__marqueeRaf) {
          cancelAnimationFrame(carousel.__marqueeRaf);
        }
        measureLoopWidth();
        carousel.__marqueeRaf = requestAnimationFrame(runMarquee);

        carousel.querySelectorAll("img").forEach((img) => {
          if (!img.complete) {
            img.addEventListener("load", () => {
              buildClones();
              measureLoopWidth();
            }, { once: true });
            img.addEventListener("error", () => {
              buildClones();
              measureLoopWidth();
            }, { once: true });
          }
        });

        if (!carousel.__marqueeResizeHandler) {
          carousel.__marqueeResizeHandler = () => {
            buildClones();
            measureLoopWidth();
          };
          window.addEventListener("resize", carousel.__marqueeResizeHandler);
        }
        if (!carousel.__marqueeVisibilityHandler) {
          carousel.__marqueeVisibilityHandler = () => {
            if (document.hidden) return;
            lastFrameTs = 0;
            buildClones();
            measureLoopWidth();
          };
          document.addEventListener("visibilitychange", carousel.__marqueeVisibilityHandler);
        }
        return;
      }
      let snapPoints = [];

      const getSnapPoints = () => {
        const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
        const points = slides.map((slide) => Math.min(Math.max(0, slide.offsetLeft), maxScroll));
        return points.filter((point, index) => index === 0 || Math.abs(point - points[index - 1]) > 2);
      };

      const rebuildSnapPoints = () => {
        snapPoints = getSnapPoints();
      };

      dotsWrap.innerHTML = "";
      rebuildSnapPoints();
      if (snapPoints.length < 2) return;
      const dots = snapPoints.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `ig-dot${index === 0 ? " active" : ""}`;
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        dot.addEventListener("click", () => {
          carousel.scrollTo({ left: snapPoints[index], behavior: "smooth" });
        });
        dotsWrap.appendChild(dot);
        return dot;
      });

      const getActiveIndex = () => {
        const left = carousel.scrollLeft;
        let bestIndex = 0;
        let bestDistance = Number.POSITIVE_INFINITY;
        snapPoints.forEach((point, index) => {
          const distance = Math.abs(point - left);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = index;
          }
        });
        return bestIndex;
      };
      const goToIndex = (index) => {
        if (!snapPoints.length) return;
        const bounded = (index + snapPoints.length) % snapPoints.length;
        carousel.scrollTo({ left: snapPoints[bounded], behavior: "smooth" });
      };

      const onScroll = () => {
        const activeIndex = getActiveIndex();
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === activeIndex);
        });
      };

      carousel.addEventListener("scroll", onScroll, { passive: true });
      prevBtn?.addEventListener("click", () => goToIndex(getActiveIndex() - 1));
      nextBtn?.addEventListener("click", () => goToIndex(getActiveIndex() + 1));
      let resizeRaf = 0;
      const onResize = () => {
        if (resizeRaf) return;
        resizeRaf = requestAnimationFrame(() => {
          resizeRaf = 0;
          rebuildSnapPoints();
          onScroll();
        });
      };
      window.addEventListener("resize", onResize, { passive: true });

      if (carousel.dataset.carouselAuto === "true") {
        let autoTimer = null;
        const parsedInterval = Number(carousel.dataset.carouselInterval);
        const intervalMs = Number.isFinite(parsedInterval) && parsedInterval >= 900 ? parsedInterval : 3200;

        const startAuto = () => {
          stopAuto();
          autoTimer = setInterval(() => {
            goToIndex(getActiveIndex() + 1);
          }, intervalMs);
        };

        const stopAuto = () => {
          if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
          }
        };

        const restartAuto = () => {
          stopAuto();
          startAuto();
        };

        carousel.addEventListener("pointerdown", stopAuto, { passive: true });
        carousel.addEventListener("touchstart", stopAuto, { passive: true });
        carousel.addEventListener("pointerup", restartAuto, { passive: true });
        carousel.addEventListener("touchend", restartAuto, { passive: true });
        carousel.addEventListener("mouseenter", stopAuto);
        carousel.addEventListener("mouseleave", restartAuto);
        prevBtn?.addEventListener("click", restartAuto);
        nextBtn?.addEventListener("click", restartAuto);

        startAuto();
      }
    };

    const initCarouselsForViewport = () => {
      document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        if (!isElementActiveForViewport(carousel)) return;
        if (carousel.dataset.carouselInit === "true") return;
        carousel.dataset.carouselInit = "true";
        initCarousel(carousel);
      });
    };

    initCarouselsForViewport();
    if (desktopMediaQuery) {
      const onViewportChange = () => {
        initCarouselsForViewport();
      };
      if (typeof desktopMediaQuery.addEventListener === "function") {
        desktopMediaQuery.addEventListener("change", onViewportChange);
      } else if (typeof desktopMediaQuery.addListener === "function") {
        desktopMediaQuery.addListener(onViewportChange);
      }
    }

    const storyViewer = document.getElementById("storyViewer");
    const storyImage = document.getElementById("storyImage");
    const storyTitle = document.getElementById("storyTitle");
    const storyClose = document.getElementById("storyClose");
    const storyPrev = document.getElementById("storyPrev");
    const storyNext = document.getElementById("storyNext");
    const storyCta = document.getElementById("storyCta");
    const storyCtaWrap = document.getElementById("storyCtaWrap");
    const storyProgress = document.getElementById("storyProgress");
    const storyTriggers = document.querySelectorAll("[data-story-open]");

    const storySets = {
      amenities: [
        { src: "./assets/amenities/a1.webp", alt: "Fitness Center" },
        { src: "./assets/amenities/a2.webp", alt: "Cafeteria" },
        { src: "./assets/amenities/a3.webp", alt: "Swimming Pool" },
        { src: "./assets/amenities/a4.webp", alt: "Indoor Games" },
        // { src: "./assets/amenities/a5.webp", alt: "ClubHouse" },
        // { src: "./assets/amenities/a6.webp", alt: "Outdoor Gym" },
      ],
      gallery: [
        { src: "./assets/gallery/g1.webp", alt: "Gallery Image 1" },
        { src: "./assets/gallery/g2.webp", alt: "Gallery Image 2" },
        { src: "./assets/gallery/g3.webp", alt: "Gallery Image 3" },
        { src: "./assets/gallery/g4.webp", alt: "Gallery Image 4" },
        { src: "./assets/gallery/g5.webp", alt: "Gallery Image 5" },
        // { src: "./assets/gallery/g6.webp", alt: "Gallery Image 6" },
        // { src: "./assets/gallery/g7.webp", alt: "Gallery Image 7" },
        // { src: "./assets/gallery/g8.webp", alt: "Gallery Image 8" },
        // { src: "./assets/gallery/g9.webp", alt: "Gallery Image 9" },
        // { src: "./assets/gallery/g10.webp", alt: "Gallery Image 10" },
      ],
    };
    const storyCtas = {
      amenities: { label: "Book Site Visit", href: "#m-pricing" },
      gallery: { label: "Download Brochure", href: "#m-brochure" },
    };

    let activeStoryKey = null;
    let activeStoryIndex = 0;
    let storyTimer = null;
    let storyTick = null;
    const storyDurationMs = 2800;

    const stopStoryTimers = () => {
      if (storyTimer) clearTimeout(storyTimer);
      if (storyTick) clearInterval(storyTick);
      storyTimer = null;
      storyTick = null;
    };

    const closeStory = () => {
      stopStoryTimers();
      storyViewer.classList.add("story-viewer-hidden");
      if (storyCtaWrap) {
        storyCtaWrap.style.top = "";
        storyCtaWrap.style.bottom = "";
      }
    };

    const applyStoryBackdrop = () => {
      const forceBlack = activeStoryKey === "amenities" || activeStoryKey === "gallery";
      if (forceBlack) {
        storyViewer.classList.add("story-force-black");
        storyViewer.classList.add("story-bg-black");
        storyViewer.classList.remove("story-bg-clear");
        requestAnimationFrame(positionStoryCta);
        return;
      }
      storyViewer.classList.remove("story-force-black");
      if (window.innerWidth >= 768) {
        storyViewer.classList.add("story-bg-black");
        storyViewer.classList.remove("story-bg-clear");
        requestAnimationFrame(positionStoryCta);
        return;
      }

      const imgW = storyImage.naturalWidth;
      const imgH = storyImage.naturalHeight;
      if (!imgW || !imgH) {
        storyViewer.classList.add("story-bg-black");
        storyViewer.classList.remove("story-bg-clear");
        return;
      }

      const imageRatio = imgW / imgH;
      const viewportRatio = window.innerWidth / window.innerHeight;
      const fitCoverage = Math.min(imageRatio / viewportRatio, viewportRatio / imageRatio);
      const useBlack = fitCoverage < 0.72;

      storyViewer.classList.toggle("story-bg-black", useBlack);
      storyViewer.classList.toggle("story-bg-clear", !useBlack);
      requestAnimationFrame(positionStoryCta);
    };

    const positionStoryCta = () => {
      if (!storyCtaWrap) return;
      if (storyViewer.classList.contains("story-viewer-hidden")) return;

      const rect = storyImage.getBoundingClientRect();
      if (!rect.height) {
        storyCtaWrap.style.top = "";
        storyCtaWrap.style.bottom = "";
        return;
      }
      const ctaGap = window.innerWidth < 768 ? 20 : 12;
      const top = Math.min(window.innerHeight - 66, Math.max(72, rect.bottom + ctaGap));
      storyCtaWrap.style.top = `${top}px`;
      storyCtaWrap.style.bottom = "auto";
    };

    const renderStory = () => {
      const set = storySets[activeStoryKey];
      if (!set || !set[activeStoryIndex]) return;
      const item = set[activeStoryIndex];
      storyImage.src = item.src;
      storyImage.alt = item.alt;
      storyImage.onload = applyStoryBackdrop;
      if (storyImage.complete) applyStoryBackdrop();
      storyTitle.textContent = `${activeStoryKey === "amenities" ? "amenities" : "gallery"}  ${activeStoryIndex + 1}/${set.length}`;
      const cta = storyCtas[activeStoryKey] || { label: "Enquire Now", href: "#m-pricing" };
      storyCta.textContent = cta.label;
      storyCta.setAttribute("href", cta.href);

      storyProgress.innerHTML = "";
      set.forEach((_, idx) => {
        const shell = document.createElement("div");
        shell.className = "story-progress";
        const fill = document.createElement("div");
        fill.className = "story-progress-fill";
        if (idx < activeStoryIndex) fill.style.width = "100%";
        shell.appendChild(fill);
        storyProgress.appendChild(shell);
      });

      const fills = storyProgress.querySelectorAll(".story-progress-fill");
      let elapsed = 0;
      stopStoryTimers();
      storyTick = setInterval(() => {
        elapsed += 60;
        const pct = Math.min((elapsed / storyDurationMs) * 100, 100);
        if (fills[activeStoryIndex]) fills[activeStoryIndex].style.width = `${pct}%`;
      }, 60);

      storyTimer = setTimeout(() => {
        if (activeStoryIndex < set.length - 1) {
          activeStoryIndex += 1;
          renderStory();
        } else {
          closeStory();
        }
      }, storyDurationMs);
    };

    const openStory = (key, startIndex = 0) => {
      if (!storySets[key]) return;
      activeStoryKey = key;
      activeStoryIndex = Math.max(0, Math.min(startIndex, storySets[key].length - 1));
      storyViewer.classList.toggle("story-force-black", key === "amenities" || key === "gallery");
      storyViewer.classList.add("story-bg-black");
      storyViewer.classList.remove("story-bg-clear");
      storyViewer.classList.remove("story-viewer-hidden");
      renderStory();
      requestAnimationFrame(positionStoryCta);
    };

    storyTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openStory(trigger.dataset.storyOpen);
      });
    });

    const getStoryStartIndexFromImage = (key, imageElement) => {
      const set = storySets[key] || [];
      const src = imageElement.getAttribute("src");
      if (!src) return 0;
      const exactIndex = set.findIndex((item) => item.src === src);
      if (exactIndex !== -1) return exactIndex;

      const fileName = src.split("/").pop();
      const fuzzyIndex = set.findIndex((item) => item.src.endsWith(fileName));
      return fuzzyIndex !== -1 ? fuzzyIndex : 0;
    };

    const bindSectionImagesToStory = (sectionSelector, key) => {
      const section = document.querySelector(sectionSelector);
      if (!section) return;
      if (!isElementActiveForViewport(section)) return;
      section.querySelectorAll("img").forEach((img) => {
        if (img.closest(".m-mobile-header-thumb")) return;
        if (img.dataset.storyBound === "true") return;
        img.dataset.storyBound = "true";
        img.style.cursor = "pointer";
        img.addEventListener("click", (event) => {
          event.preventDefault();
          openStory(key, getStoryStartIndexFromImage(key, img));
        });
      });
    };

    const initStoryImageBindingsForViewport = () => {
      bindSectionImagesToStory("#m-amenities", "amenities");
      bindSectionImagesToStory("#m-gallery", "gallery");
      bindSectionImagesToStory("#amenities", "amenities");
      bindSectionImagesToStory("#gallery", "gallery");
    };

    initStoryImageBindingsForViewport();
    if (desktopMediaQuery) {
      const onStoryViewportChange = () => {
        initStoryImageBindingsForViewport();
      };
      if (typeof desktopMediaQuery.addEventListener === "function") {
        desktopMediaQuery.addEventListener("change", onStoryViewportChange);
      } else if (typeof desktopMediaQuery.addListener === "function") {
        desktopMediaQuery.addListener(onStoryViewportChange);
      }
    }

    storyClose.addEventListener("click", closeStory);
    storyCta.addEventListener("click", () => {
      closeStory();
    });
    storyPrev.addEventListener("click", () => {
      if (!activeStoryKey) return;
      if (activeStoryIndex > 0) {
        activeStoryIndex -= 1;
        renderStory();
      }
    });
    storyNext.addEventListener("click", () => {
      if (!activeStoryKey) return;
      const set = storySets[activeStoryKey];
      if (activeStoryIndex < set.length - 1) {
        activeStoryIndex += 1;
        renderStory();
      } else {
        closeStory();
      }
    });

    window.addEventListener("resize", () => {
      if (!storyViewer.classList.contains("story-viewer-hidden")) {
        applyStoryBackdrop();
        positionStoryCta();
      }
    });

    const leadPopupModal = document.getElementById("leadPopupModal");
    const leadPopupBackdrop = document.getElementById("leadPopupBackdrop");
    const leadPopupClose = document.getElementById("leadPopupClose");
    const leadPopupTitle = document.getElementById("leadPopupTitle");
    const leadPopupSource = document.getElementById("leadPopupSource");
    const leadPopupForm = document.querySelector(".leadPopupForm");
    const leadPopupSubmit = document.getElementById("leadPopupSubmit");

    const mapCtaTitle = (label) => {
      const text = (label || "").toLowerCase();
      if (text.includes("emi") || text.includes("bank")) {is_loan = 1; return "Enquire EMI & Loan"};
      // if (text.includes("loan") || text.includes("bank")) return "Home Loan Assistance";
      if (text.includes("price")) return "Download Price Sheet";
      if (text.includes("brochure")) return "Download Brochure";
      if (text.includes("floor plan")) return "Download Floor Plan";
      if (text.includes("amenities")) return "Download Amenities";
      if (text.includes("gallery")) return "Download Gallery";
      if (text.includes("virtual") || text.includes("tour")) return "Start Virtual Tour";
      if (text.includes("site visit") || text.includes("visit")) return "Book Site Visit";
      if (text.includes("location map")) return "Download Location Map";
      if (text.includes("call") || text.includes("expert")) return "Schedule Pricing Call";
      if (text.includes("quote") || text.includes("offer")) return "Request Best Offer";
      if (text.includes("enquire") || text.includes("enquiry")) return "Enquire Now";
      if (text.includes("request")) return "Request Details";
      return "Enquire Now";
    };

    var dl = {};
const brochureStorageKey = "pendingBrochureDownload";
const brochureFormFlag = "brochureDownloadRequested";
const brchurefilename = "brochure.pdf";


    const openLeadPopup = (label) => {
      const rawLabel = (label || "").replace(/\s+/g, " ").trim();
      const popupTitle = mapCtaTitle(rawLabel);
      leadPopupTitle.textContent = popupTitle;
      leadPopupSource.value = rawLabel || "Unknown CTA";
      const isBrochureCta = /brochure|pdf/i.test(`${popupTitle} ${rawLabel}`);
      console.log(leadPopupForm.dataset.downloadType, isBrochureCta);
      // leadPopupForm.dataset.downloadType = isBrochureCta ? "brochure" : "";
      // leadPopupSubmit.textContent = isBrochureCta ? "Download Brochure" : "Submit Request";
      // if (isBrochureCta) {
      //   dl = { file:brchurefilename, name: brchurefilename };
      //   try {
      //     sessionStorage.setItem(brochureStorageKey, JSON.stringify(dl));
      //   } catch (error) {
      //     alert("Unable to save brochure download. Please allow storage access and try again.");
      //   }
      // } 
      leadPopupModal.classList.remove("hidden");
      requestAnimationFrame(() => {
        leadPopupModal.classList.remove("pointer-events-none", "opacity-0");
      });
    };

    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        openLeadPopup("Enquire Now");
      }, 9000);
    });

    const closeLeadPopup = () => {
      // try {
      //     sessionStorage.removeItem(brochureStorageKey);
      //   } catch (error) {
      //     console.log("Unable to clear brochure download storage, but proceeding with lead capture.");
      //   }
      leadPopupModal.classList.add("opacity-0", "pointer-events-none");
      is_loan = 0;
      setTimeout(() => {
        if (leadPopupModal.classList.contains("opacity-0")) {
          leadPopupModal.classList.add("hidden");
        }
      }, 200);
    };

    const isCtaElement = (element) => {
      if (!element) return false;
      if (element.id === "menuToggle" || element.id === "storyClose" || element.id === "storyPrev" || element.id === "storyNext") return false;
      if (element.hasAttribute("data-theme-toggle")) return false;
      if (element.classList.contains("ig-dot")) return false;
      if (element.hasAttribute("data-readmore-toggle") || element.hasAttribute("data-story-open")) return false;
      if (element.closest("#leadPopupModal")) return false;
      if (element.closest("form")) return false;

      const tag = element.tagName.toLowerCase();
      if (tag !== "button" && tag !== "a") return false;

      const label = (element.dataset.popupTitle || element.textContent || "").replace(/\s+/g, " ").trim();
      if (!label) return false;

      const href = element.getAttribute("href") || "";
      const isBottomNav = element.closest(".fixed.bottom-0.left-0.right-0");
      if (isBottomNav) return false;
      if (tag === "a" && href.startsWith("#m-") && /^(home|pricing|floor plan|amenities|gallery|location)$/i.test(label)) return false;
      if (tag === "a" && href.startsWith("#") && /^(home|pricing|floor plan|amenities|gallery|location)$/i.test(label)) return false;

      return /(download|get|book|request|enquire|enquiry|tour|visit|quote|offer|price|plan|brochure|pdf)/i.test(label);
    };

    document.addEventListener("click", (event) => {
      const element = event.target.closest("button, a");
      if (!element || !isCtaElement(element)) return;
      event.preventDefault();
      openLeadPopup(element.dataset.popupTitle || element.textContent);
    });

    leadPopupBackdrop.addEventListener("click", closeLeadPopup);
    leadPopupClose.addEventListener("click", closeLeadPopup);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !leadPopupModal.classList.contains("hidden")) {
        closeLeadPopup();
      }
    });

    document.querySelectorAll("[data-readmore-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.readmoreToggle);
        if (!target) return;
        const expanded = target.classList.toggle("expanded");
        if (target.id === "highlightsCaption") {
          target.classList.toggle("collapsed-points", !expanded);
        }
        button.textContent = expanded ? "Read less" : "Read more";
      });
    });

    const inrFormatter = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    });

    const formatEmiCurrency = (amount) => `Rs. ${inrFormatter.format(Math.round(amount))}`;

    const initEmiCalculator = ({
      loanAmountInputId,
      interestRateInputId,
      tenureYearsInputId,
      loanAmountValueId,
      interestRateValueId,
      tenureYearsValueId,
      monthlyValueId,
      interestValueId,
      totalValueId,
      principalValueId,
      donutId,
      currencyFormatter = formatEmiCurrency,
      interestRateFormatter = (value) => `${value.toFixed(2)}% p.a.`,
      tenureFormatter = (value) => `${value} Years`,
    }) => {
      const emiLoanAmountInput = document.getElementById(loanAmountInputId);
      const emiInterestRateInput = document.getElementById(interestRateInputId);
      const emiTenureYearsInput = document.getElementById(tenureYearsInputId);

      if (!emiLoanAmountInput || !emiInterestRateInput || !emiTenureYearsInput) return;

      const emiLoanAmountValue = document.getElementById(loanAmountValueId);
      const emiInterestRateValue = document.getElementById(interestRateValueId);
      const emiTenureYearsValue = document.getElementById(tenureYearsValueId);
      const emiMonthlyValue = document.getElementById(monthlyValueId);
      const emiInterestValue = document.getElementById(interestValueId);
      const emiTotalValue = document.getElementById(totalValueId);
      const emiPrincipalValue = document.getElementById(principalValueId);
      const emiDonut = donutId ? document.getElementById(donutId) : null;
      const valueFields = [
        { input: emiLoanAmountInput, field: emiLoanAmountValue, decimals: 0 },
        { input: emiInterestRateInput, field: emiInterestRateValue, decimals: 2 },
        { input: emiTenureYearsInput, field: emiTenureYearsValue, decimals: 0 },
      ];

      const updateSliderProgress = (input) => {
        const min = Number(input.min || 0);
        const max = Number(input.max || 100);
        const value = Number(input.value || 0);
        const progress = ((value - min) / (max - min)) * 100;
        input.style.setProperty("--emi-progress", `${progress}%`);
      };

      const sanitizeNumericValue = (value, decimals = 0) => {
        const cleaned = String(value ?? "")
          .replace(decimals > 0 ? /[^0-9.]/g : /[^0-9]/g, "")
          .replace(/(\..*)\./g, "$1");

        if (decimals <= 0) {
          return cleaned;
        }

        if (cleaned.endsWith(".")) {
          const wholePart = cleaned.slice(0, -1);
          return `${wholePart}.`;
        }

        const [whole = "", fraction = ""] = cleaned.split(".");
        return fraction ? `${whole}.${fraction.slice(0, decimals)}` : whole;
      };

      const clampToInputRange = (input, rawValue) => {
        const min = Number(input.min || 0);
        const max = Number(input.max || rawValue);
        const numericValue = Number(rawValue);

        if (!Number.isFinite(numericValue)) {
          return Number(input.value || min);
        }

        return Math.min(max, Math.max(min, numericValue));
      };

      const formatFieldValue = (value, decimals = 0) => (
        decimals > 0 ? Number(value).toFixed(decimals) : String(Math.round(value))
      );

      const isValueWithinRange = (input, numericValue) => {
        const min = Number(input.min || 0);
        const max = Number(input.max || numericValue);
        return numericValue >= min && numericValue <= max;
      };

      const getFieldNumericValue = (field, decimals) => {
        const sanitizedValue = sanitizeNumericValue(field?.value, decimals);
        const numericValue = Number(sanitizedValue);
        return Number.isFinite(numericValue) ? numericValue : null;
      };

      const getEffectiveValue = (input, field, decimals, preferField = false) => {
        if (preferField && document.activeElement === field) {
          return getFieldNumericValue(field, decimals) ?? Number(input.value);
        }

        return Number(input.value);
      };

      const syncFieldValues = ({ principal, annualRate, years, force = false }) => {
        const nextValues = [principal, annualRate, years];

        valueFields.forEach(({ field, decimals }, index) => {
          if (!field) return;
          if (!force && document.activeElement === field) return;
          field.value = formatFieldValue(nextValues[index], decimals);
        });
      };

      const updateEmiCalculator = (event) => {
        const activeField = event?.target;
        const principal = getEffectiveValue(
          emiLoanAmountInput,
          emiLoanAmountValue,
          0,
          activeField === emiLoanAmountValue
        );
        const annualRate = getEffectiveValue(
          emiInterestRateInput,
          emiInterestRateValue,
          2,
          activeField === emiInterestRateValue
        );
        const years = getEffectiveValue(
          emiTenureYearsInput,
          emiTenureYearsValue,
          0,
          activeField === emiTenureYearsValue
        );

        if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(years) || years <= 0) {
          return;
        }

        const monthlyRate = annualRate / 12 / 100;
        const months = years * 12;
        const emi =
          monthlyRate === 0
            ? principal / months
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;
        const interestAngle = totalPayment > 0 ? (totalInterest / totalPayment) * 360 : 0;

        syncFieldValues({ principal, annualRate, years });
        emiMonthlyValue.textContent = currencyFormatter(emi);
        emiInterestValue.textContent = currencyFormatter(totalInterest);
        emiTotalValue.textContent = currencyFormatter(totalPayment);
        emiPrincipalValue.textContent = currencyFormatter(principal);

        [emiLoanAmountInput, emiInterestRateInput, emiTenureYearsInput].forEach(updateSliderProgress);

        if (emiDonut) {
          emiDonut.style.setProperty("--emi-interest-angle", `${interestAngle}deg`);
        }
      };

      [emiLoanAmountInput, emiInterestRateInput, emiTenureYearsInput].forEach((input) => {
        const releaseFocusedField = () => {
          const activeElement = document.activeElement;
          if (activeElement && valueFields.some(({ field }) => field === activeElement)) {
            activeElement.blur();
          }
        };

        input.addEventListener("pointerdown", releaseFocusedField);
        input.addEventListener("touchstart", releaseFocusedField, { passive: true });
        input.addEventListener("input", updateEmiCalculator);
      });

      valueFields.forEach(({ input, field, decimals }) => {
        if (!field) return;

        field.addEventListener("input", (event) => {
          const sanitizedValue = sanitizeNumericValue(field.value, decimals);
          field.value = sanitizedValue;

          if (!sanitizedValue) return;

          const hasTrailingDecimal = decimals > 0 && sanitizedValue.endsWith(".");
          if (hasTrailingDecimal) {
            updateEmiCalculator(event);
            return;
          }

          const numericValue = Number(sanitizedValue);
          if (Number.isFinite(numericValue) && isValueWithinRange(input, numericValue)) {
            input.value = String(numericValue);
          }

          updateEmiCalculator(event);
        });

        field.addEventListener("blur", () => {
          const numericValue = getFieldNumericValue(field, decimals);
          const nextValue = clampToInputRange(input, numericValue ?? input.value);
          input.value = String(nextValue);
          field.value = formatFieldValue(nextValue, decimals);
          updateEmiCalculator();
        });
      });

      updateEmiCalculator();
    };

    initEmiCalculator({
      loanAmountInputId: "emiLoanAmount",
      interestRateInputId: "emiInterestRate",
      tenureYearsInputId: "emiTenureYears",
      loanAmountValueId: "emiLoanAmountValue",
      interestRateValueId: "emiInterestRateValue",
      tenureYearsValueId: "emiTenureYearsValue",
      monthlyValueId: "emiMonthlyValue",
      interestValueId: "emiInterestValue",
      totalValueId: "emiTotalValue",
      principalValueId: "emiPrincipalValue",
      donutId: "emiDonut",
    });

    initEmiCalculator({
      loanAmountInputId: "mEmiLoanAmount",
      interestRateInputId: "mEmiInterestRate",
      tenureYearsInputId: "mEmiTenureYears",
      loanAmountValueId: "mEmiLoanAmountValue",
      interestRateValueId: "mEmiInterestRateValue",
      tenureYearsValueId: "mEmiTenureYearsValue",
      monthlyValueId: "mEmiMonthlyValue",
      interestValueId: "mEmiInterestValue",
      totalValueId: "mEmiTotalValue",
      principalValueId: "mEmiPrincipalValue",
      donutId: "mEmiDonut",
      currencyFormatter: (amount) => `₹${inrFormatter.format(Math.round(amount))}`,
      interestRateFormatter: (value) => `${value.toFixed(1)}%`,
      tenureFormatter: (value) => `${value} Yr`,
    });

    //form validation for mobile number only input fields
    document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll(".form-number").forEach(element =>{
        element.addEventListener("keydown",keyEventListener);
    })
})

function keyEventListener(e) {
    if (!/^[0-9]$/.test(e.key) && e.key.length == 1 ){
        e.preventDefault();
    }
}


    document.addEventListener("DOMContentLoaded", () => {
      const mobileOnly = window.matchMedia("(max-width: 767px)");
      const locationDetails = Array.from(document.querySelectorAll("#m-location details"));

      if (!locationDetails.length) {
        return;
      }

      locationDetails.forEach((details) => {
        details.addEventListener("toggle", () => {
          if (!mobileOnly.matches || !details.open) {
            console.log("Close connectiivty");
            // details.querySelector(".map-arrow").style.transform = "rotate(0)"
            return;
          }

          locationDetails.forEach((item) => {
            // item.querySelector(".map-arrow").style.transform = "rotate(180deg)"
            console.log(item);
            if (item !== details) {
              item.open = false;
              console.log("open connectivity")
              // item.querySelector(".map-arrow").style.transform = "rotate(0deg)"
            }
          });
        });
      });
    });

    document.addEventListener("DOMContentLoaded", () => {
      const mapDropdowns = Array.from(document.querySelectorAll(".map-dropdown"));

      if (!mapDropdowns.length) {
        return;
      }

      const closeMapDropdown = (dropdown) => {
        const trigger = dropdown.querySelector(".map-dropdown-trigger");
        const content = dropdown.querySelector(".map-dropdown-content");

        if (!trigger || !content) {
          return;
        }

        dropdown.dataset.open = "false";
        trigger.setAttribute("aria-expanded", "false");
        content.hidden = true;
        trigger.style.marginBottom = "0";
      };

      const openMapDropdown = (dropdown) => {
        const trigger = dropdown.querySelector(".map-dropdown-trigger");
        const content = dropdown.querySelector(".map-dropdown-content");

        if (!trigger || !content) {
          return;
        }

        mapDropdowns.forEach((item) => {
          if (item !== dropdown) {
            closeMapDropdown(item);
          }
        });

        dropdown.dataset.open = "true";
        trigger.setAttribute("aria-expanded", "true");
        content.hidden = false;
        trigger.style.marginBottom = "2rem";
      };

      mapDropdowns.forEach((dropdown, index) => {
        const heading = dropdown.querySelector("h1, h2, h3, h4, h5, h6");
        const content = Array.from(dropdown.children).find((child) => child !== heading);

        if (!heading || !content) {
          return;
        }

        const trigger = document.createElement("button");
        const contentId = `map-dropdown-panel-${index + 1}`;
        const isInitiallyOpen = index === 0;

        trigger.type = "button";
        trigger.className = "map-dropdown-trigger";
        trigger.setAttribute("aria-expanded", isInitiallyOpen ? "true" : "false");
        trigger.setAttribute("aria-controls", contentId);
        trigger.style.width = "100%";
        trigger.style.display = "flex";
        trigger.style.alignItems = "center";
        trigger.style.justifyContent = "space-between";
        trigger.style.gap = "1rem";
        trigger.style.textAlign = "left";
        trigger.style.padding = "0";
        trigger.style.border = "0";
        trigger.style.background = "transparent";
        trigger.style.cursor = "pointer";
        trigger.style.marginBottom = isInitiallyOpen ? "2rem" : "0";

        const headingClone = heading.cloneNode(true);
        headingClone.classList.remove("mb-8");
        headingClone.style.margin = "0";

        const icon = document.createElement("span");
        icon.className = "map-dropdown-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = isInitiallyOpen ? "⌃" : "⌄";
        icon.style.flexShrink = "0";
        icon.style.fontSize = "1.5rem";
        icon.style.lineHeight = "1";
        icon.style.color = "rgb(var(--color-gold-rgb))";

        trigger.append(headingClone, icon);
        heading.replaceWith(trigger);

        content.classList.add("map-dropdown-content");
        content.id = contentId;
        content.hidden = !isInitiallyOpen;
        dropdown.dataset.open = isInitiallyOpen ? "true" : "false";

        trigger.addEventListener("click", () => {
          const shouldOpen = dropdown.dataset.open !== "true";

          if (!shouldOpen) {
            closeMapDropdown(dropdown);
            icon.textContent = "⌄";
            return;
          }

          openMapDropdown(dropdown);
          mapDropdowns.forEach((item) => {
            const itemIcon = item.querySelector(".map-dropdown-icon");
            if (itemIcon) {
              itemIcon.textContent = item === dropdown ? "⌃" : "⌄";
            }
          });
        });
      });
    });
