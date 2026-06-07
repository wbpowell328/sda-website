// Custom LaTeX macros used in Warren Powell's books.
// Source of truth: Ask Prof Powell chat material/Reinforcement Learning and Stochastic Optimization/00-OUU_Wiley.tex
//
// IMPORTANT: This file is duplicated at assets/js/mathjax-macros.js for the
// Jekyll site (different origin from the chatbot). If you change one, change
// the other. Both must load BEFORE the inline `window.MathJax = { ... }` block.
//
// MathJax reads window.CASTLE_MATH_MACROS at startup. Macros that take no
// arguments are written as strings; macros with arguments use the form
// [definition, numArgs] (none of ours currently take arguments).

window.CASTLE_MATH_MACROS = {
  // ---- Probability / expectation / operators ----
  E:        "{\\mathbb{E}}",
  Exp:      "{\\mathbb{E}}",
  Pr:       "{\\mathbb{P}}",
  Prob:     "{\\mathbb{P}}",
  R:        "{\\mathbb{R}}",
  Argmax:   "{\\rm Arg}\\,\\max",
  Argmin:   "{\\rm Arg}\\,\\min",
  argmax:   "\\operatorname*{arg\\,max}",
  argmin:   "\\operatorname*{arg\\,min}",
  Var:      "\\textit{Var}",
  Cov:      "\\operatorname{Cov}",

  // ---- Book shortcuts ----
  discount:   "\\gamma",
  step:       "\\alpha",
  stephat:    "\\hat \\alpha",
  stepbar:    "\\bar \\alpha",
  stepbold:   "{\\bf \\alpha}",
  alphabar:   "\\bar \\alpha",
  alphabold:  "{\\bf \\alpha}",
  err:        "{\\varepsilon}",
  imp:        "{~\\Rightarrow~}",
  goto:       "\\!\\rightarrow\\!",
  as:         "~\\text{a.s.}",
  dotprod:    "{\\scriptscriptstyle \\stackrel{\\bullet}{{}}}",

  // ---- Greek with hats / tildes / bars ----
  xihat:          "\\hat \\xi",
  tauhat:         "\\hat \\tau",
  gammahat:       "\\hat \\gamma",
  muhat:          "\\hat \\mu",
  deltahat:       "\\hat \\delta",
  varepsilonhat:  "\\hat \\varepsilon",
  varepsilonbar:  "\\bar \\varepsilon",
  Omegatilde:     "{\\tilde \\Omega}",
  omegatilde:     "{\\tilde \\omega}",
  Omegaforecast:  "\\hat \\Omega",
  Omegahat:       "\\hat \\Omega",
  omegahat:       "\\hat \\omega",
  nutilde:        "{\\tilde \\nu}",
  mutilde:        "{\\tilde \\mu}",
  pitilde:        "{\\tilde \\pi}",
  rhotilde:       "{\\tilde \\rho}",
  sigmatilde:     "\\tilde \\sigma",
  thetatilde:     "\\tilde \\theta",
  sigmabar:       "\\bar \\sigma",
  sigmahat:       "\\hat \\sigma",
  rhohat:         "\\hat \\rho",
  rhobar:         "\\bar \\rho",
  thetahat:       "\\hat \\theta",
  thetabar:       "\\bar \\theta",
  betabar:        "\\bar \\beta",
  betahat:        "\\hat \\beta",
  Sigmatilde:     "\\tilde \\Sigma",
  nuhat:          "\\hat \\nu",
  nubar:          "\\bar \\nu",
  taubar:         "\\bar \\tau",
  Deltabar:       "\\bar \\Delta",
  Deltahat:       "\\hat \\Delta",
  Thetahat:       "\\hat \\Theta",
  deltabar:       "\\bar \\delta",
  mubar:          "\\bar \\mu",

  // ---- x-hat (lowercase) ----
  ahat: "\\hat a", bhat: "\\hat b", chat: "\\hat c", dhat: "\\hat d",
  ehat: "\\hat e", fhat: "\\hat f", ghat: "\\hat g", hhat: "\\hat h",
  ihat: "\\hat i", jhat: "\\hat j", khat: "\\hat k", lhat: "\\hat l",
  mhat: "\\hat m", nhat: "\\hat n", ohat: "\\hat o", phat: "\\hat p",
  qhat: "\\hat q", rhat: "\\hat r", shat: "\\hat s", that: "\\hat t",
  uhat: "\\hat u", vhat: "\\hat v", what: "\\hat w", xhat: "\\hat x",
  yhat: "\\hat y", zhat: "\\hat z",

  // ---- X-hat (uppercase; book skips some letters) ----
  Ahat: "\\hat A", Bhat: "\\hat B", Chat: "\\hat C", Dhat: "\\hat D",
  Ehat: "\\hat E", Fhat: "\\hat F", Ghat: "\\hat G", Hhat: "\\hat H",
  Ihat: "\\hat I", Lhat: "\\hat L", Mhat: "\\hat M", Nhat: "\\hat N",
  Phat: "\\hat P", Qhat: "\\hat Q", Rhat: "\\hat R", Shat: "\\hat S",
  Uhat: "\\hat U", Vhat: "\\hat V", What: "\\widehat W", Xhat: "\\hat X",

  // ---- x-tilde (lowercase) ----
  atilde: "{\\tilde a}", btilde: "{\\tilde b}", ctilde: "{\\tilde c}",
  dtilde: "{\\tilde d}", etilde: "{\\tilde e}", ftilde: "{\\tilde f}",
  gtilde: "{\\tilde g}", htilde: "{\\tilde h}", itilde: "{\\tilde i}",
  jtilde: "{\\tilde j}", ktilde: "{\\tilde k}", ltilde: "{\\tilde l}",
  mtilde: "{\\tilde m}", ntilde: "{\\tilde n}", otilde: "{\\tilde o}",
  ptilde: "{\\tilde p}", qtilde: "{\\tilde q}", rtilde: "{\\tilde r}",
  stilde: "{\\tilde s}", ttilde: "{\\tilde t}", utilde: "{\\tilde u}",
  vtilde: "{\\tilde v}", wtilde: "{\\tilde w}", xtilde: "{\\tilde x}",
  ytilde: "{\\tilde y}", ztilde: "{\\tilde z}",

  // ---- X-tilde (uppercase) ----
  Atilde: "{\\tilde A}", Btilde: "{\\tilde B}", Ctilde: "{\\tilde C}",
  Dtilde: "{\\tilde D}", Etilde: "{\\tilde E}", Ftilde: "{\\tilde F}",
  Gtilde: "{\\tilde G}", Htilde: "{\\tilde H}", Itilde: "{\\tilde I}",
  Jtilde: "{\\tilde J}", Ktilde: "{\\tilde K}", Ltilde: "{\\tilde L}",
  Mtilde: "{\\tilde M}", Ntilde: "{\\tilde N}", Otilde: "{\\tilde O}",
  Ptilde: "{\\tilde P}", Qtilde: "{\\tilde Q}", Rtilde: "{\\tilde R}",
  Stilde: "{\\tilde S}", Ttilde: "{\\tilde T}", Utilde: "{\\tilde U}",
  Vtilde: "{\\tilde V}", Wtilde: "{\\tilde W}",
  Xtilde: "{\\tilde X}", Ytilde: "{\\tilde Y}", Ztilde: "{\\tilde Y}",
  Vtildenew: "\\stackrel{\\sim\\;}{V}",
  Wtildenew: "\\stackrel{\\sim\\;}{W}",
  Nforward:  "\\stackrel{\\rightarrow}{\\mathcal N}",

  // ---- x-bar (lowercase) ----
  abar: "\\bar a", bbar: "\\bar b", cbar: "\\bar c", dbar: "\\bar d",
  ebar: "\\bar e", fbar: "\\bar f", gbar: "\\bar g", hbar: "\\bar h",
  ibar: "\\bar i", jbar: "\\bar j", kbar: "\\bar k", lbar: "\\bar l",
  mbar: "\\bar m", nbar: "\\bar n", obar: "\\bar o", pbar: "\\bar p",
  qbar: "\\bar q", rbar: "\\bar r", sbar: "\\bar s", tbar: "\\bar t",
  ubar: "\\bar u", vbar: "\\bar v", wbar: "\\bar w", xbar: "\\bar x",
  ybar: "\\bar y", zbar: "\\bar z",

  // ---- X-bar (uppercase) ----
  Abar: "\\bar A", Bbar: "\\bar B", Cbar: "\\bar C", Dbar: "\\bar D",
  Ebar: "\\bar E", Fbar: "\\bar F", Gbar: "\\bar G", Hbar: "\\bar H",
  Ibar: "\\bar I", Jbar: "\\bar J", Kbar: "\\bar K", Lbar: "\\bar L",
  Mbar: "\\bar M", Nbar: "\\bar N", Pbar: "\\bar P", Qbar: "\\bar Q",
  Rbar: "\\bar R", Sbar: "\\bar S", Tbar: "\\bar T", Ubar: "\\bar U",
  Vbar: "\\overline V", Wbar: "\\overline W",
  Xbar: "\\bar X", Ybar: "\\bar Y", Zbar: "\\bar Z",

  // ---- Calligraphic (\mathcal) ----
  Acal: "{\\mathcal A}", Bcal: "{\\mathcal B}", Ccal: "{\\mathcal C}",
  Dcal: "{\\mathcal D}", Ecal: "{\\mathcal E}", Fcal: "{\\mathcal F}",
  Gcal: "{\\mathcal G}", Hcal: "{\\mathcal H}", Ical: "{\\mathcal I}",
  Jcal: "{\\mathcal J}", Kcal: "{\\mathcal K}", Lcal: "{\\mathcal L}",
  Mcal: "{\\mathcal M}", Ncal: "{\\mathcal N}", Ocal: "{\\mathcal O}",
  Pcal: "{\\mathcal P}", Qcal: "{\\mathcal Q}", Rcal: "{\\mathcal R}",
  Scal: "{\\mathcal S}", Tcal: "{\\mathcal T}", Ucal: "{\\mathcal U}",
  Vcal: "{\\mathcal V}", Wcal: "{\\mathcal W}", Xcal: "{\\mathcal X}",
  Ycal: "{\\mathcal Y}", Zcal: "{\\mathcal Z}",

  // ---- Fraktur (\mathfrak) ----
  Afrak: "{\\mathfrak A}", Bfrak: "{\\mathfrak B}", Cfrak: "{\\mathfrak C}",
  Dfrak: "{\\mathfrak D}", Efrak: "{\\mathfrak E}", Ffrak: "{\\mathfrak F}",
  Gfrak: "{\\mathfrak G}", Hfrak: "{\\mathfrak H}", Ifrak: "{\\mathfrak I}",
  Jfrak: "{\\mathfrak J}", Kfrak: "{\\mathfrak K}", Lfrak: "{\\mathfrak L}",
  Mfrak: "{\\mathfrak M}", Nfrak: "{\\mathfrak N}", Ofrak: "{\\mathfrak O}",
  Pfrak: "{\\mathfrak P}", Qfrak: "{\\mathfrak Q}", Rfrak: "{\\mathfrak R}",
  Sfrak: "{\\mathfrak S}", Tfrak: "{\\mathfrak T}", Ufrak: "{\\mathfrak U}",
  Vfrak: "{\\mathfrak V}", Wfrak: "{\\mathfrak W}", Xfrak: "{\\mathfrak X}",
  Yfrak: "{\\mathfrak Y}", Zfrak: "{\\mathfrak Z}",

  // ---- Calligraphic with hat / tilde / bar ----
  Ycalbar:    "{\\bar {\\mathcal Y}}",
  Acalhat:    "{\\hat {\\mathcal A}}", Bcalhat: "{\\hat {\\mathcal B}}",
  Ccalhat:    "{\\hat {\\mathcal C}}", Dcalhat: "{\\hat {\\mathcal D}}",
  Ecalhat:    "{\\hat {\\mathcal E}}", Fcalhat: "{\\hat {\\mathcal F}}",
  Gcalhat:    "{\\hat {\\mathcal G}}", Hcalhat: "{\\hat {\\mathcal H}}",
  Icalhat:    "{\\hat {\\mathcal I}}", Jcalhat: "{\\hat {\\mathcal J}}",
  Kcalhat:    "{\\hat {\\mathcal K}}", Lcalhat: "{\\hat {\\mathcal L}}",
  Mcalhat:    "{\\hat {\\mathcal M}}", Ncalhat: "{\\hat {\\mathcal N}}",
  Ocalhat:    "{\\hat {\\mathcal O}}", Pcalhat: "{\\hat {\\mathcal P}}",
  Qcalhat:    "{\\hat {\\mathcal Q}}", Rcalhat: "{\\hat {\\mathcal R}}",
  Scalhat:    "{\\hat {\\mathcal S}}", Tcalhat: "{\\hat {\\mathcal T}}",
  Ucalhat:    "{\\hat {\\mathcal U}}", Vcalhat: "{\\hat {\\mathcal V}}",
  Wcalhat:    "{\\hat {\\mathcal W}}", Xcalhat: "{\\hat {\\mathcal X}}",
  Ycalhat:    "{\\hat {\\mathcal Y}}", Zcalhat: "{\\hat {\\mathcal Z}}",
  Acaltilde:  "{\\tilde {\\mathcal A}}",

  // ---- Bold (selected letters; the book only defines these) ----
  bolda: "{\\bf a}", boldb: "{\\bf b}", boldc: "{\\bf c}", boldd: "{\\bf d}",
  bolde: "{\\bf e}", boldf: "{\\bf f}", boldg: "{\\bf g}", boldh: "{\\bf h}",
  boldp: "{\\bf p}", boldt: "{\\bf t}", boldw: "{\\bf w}", boldx: "{\\bf x}",
  boldz: "{\\bf z}",
  boldG: "{\\bf G}", boldS: "{\\bf S}", boldR: "{\\bf R}",
};
