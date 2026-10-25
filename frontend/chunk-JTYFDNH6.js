import {
  DefaultValueAccessor,
  FormsModule,
  MatIcon,
  MatIconModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-7DP47XOU.js";
import {
  AuthService,
  Router
} from "./chunk-FLFTDWY7.js";
import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DXE7WTAU.js";

// src/app/features/login/login.ts
var _c0 = () => ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
function Login_Conditional_9_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function Login_Conditional_9_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 12);
  }
}
function Login_Conditional_9_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Continuer");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, Login_Conditional_9_Conditional_0_Conditional_6_Template, 2, 1, "p", 10);
    \u0275\u0275elementStart(7, "button", 11);
    \u0275\u0275listener("click", function Login_Conditional_9_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.continueWithSavedEmail());
    });
    \u0275\u0275conditionalCreate(8, Login_Conditional_9_Conditional_0_Conditional_8_Template, 1, 0, "span", 12)(9, Login_Conditional_9_Conditional_0_Conditional_9_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 13);
    \u0275\u0275listener("click", function Login_Conditional_9_Conditional_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.switchAccount());
    });
    \u0275\u0275text(11, " Changer de compte ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const recognizedEmail_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(recognizedEmail_r3.charAt(0).toUpperCase());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(recognizedEmail_r3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loading() ? 8 : 9);
  }
}
function Login_Conditional_9_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function Login_Conditional_9_Conditional_1_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      \u0275\u0275nextContext();
      const emailInput_r6 = \u0275\u0275reference(6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.email = "";
      return \u0275\u0275resetView(emailInput_r6.focus());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function Login_Conditional_9_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function Login_Conditional_9_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 12);
  }
}
function Login_Conditional_9_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Continuer");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 14);
    \u0275\u0275listener("ngSubmit", function Login_Conditional_9_Conditional_1_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitEmail());
    });
    \u0275\u0275elementStart(1, "label", 15)(2, "span", 16);
    \u0275\u0275text(3, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 17)(5, "input", 18, 0);
    \u0275\u0275twoWayListener("ngModelChange", function Login_Conditional_9_Conditional_1_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.email, $event) || (ctx_r1.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(7, Login_Conditional_9_Conditional_1_Conditional_7_Template, 3, 0, "button", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, Login_Conditional_9_Conditional_1_Conditional_8_Template, 2, 1, "p", 10);
    \u0275\u0275elementStart(9, "button", 20);
    \u0275\u0275conditionalCreate(10, Login_Conditional_9_Conditional_1_Conditional_10_Template, 1, 0, "span", 12)(11, Login_Conditional_9_Conditional_1_Conditional_11_Template, 2, 0, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.email);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.email ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.emailValid || ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loading() ? 10 : 11);
  }
}
function Login_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Login_Conditional_9_Conditional_0_Template, 12, 5, "div", 6)(1, Login_Conditional_9_Conditional_1_Template, 12, 5, "form", 6);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.useSavedAccount() && ctx_r1.savedEmail()) ? 0 : 1, tmp_1_0);
  }
}
function Login_Conditional_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function Login_Conditional_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.infoMessage());
  }
}
function Login_Conditional_10_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
  if (rf & 2) {
    const $index_r8 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("code-dot--filled", $index_r8 < ctx_r1.code().length);
  }
}
function Login_Conditional_10_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function Login_Conditional_10_For_14_Template_button_click_0_listener() {
      const digit_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.tapDigit(digit_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const digit_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", digit_r10, " ");
  }
}
function Login_Conditional_10_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function Login_Conditional_10_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.forgotCode());
    });
    \u0275\u0275text(1, " Code oubli\xE9 ? ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.loading());
  }
}
function Login_Conditional_10_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function Login_Conditional_10_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.backToEmail());
    });
    \u0275\u0275text(1, " Changer d'email ");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_10_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function Login_Conditional_10_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.backToEmail());
    });
    \u0275\u0275text(1, " Annuler ");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "p", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, Login_Conditional_10_Conditional_7_Template, 2, 1, "p", 10);
    \u0275\u0275conditionalCreate(8, Login_Conditional_10_Conditional_8_Template, 2, 1, "p", 24);
    \u0275\u0275elementStart(9, "div", 25);
    \u0275\u0275repeaterCreate(10, Login_Conditional_10_For_11_Template, 1, 2, "span", 26, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 27);
    \u0275\u0275repeaterCreate(13, Login_Conditional_10_For_14_Template, 2, 2, "button", 28, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275element(15, "span");
    \u0275\u0275elementStart(16, "button", 29);
    \u0275\u0275listener("click", function Login_Conditional_10_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tapDigit("0"));
    });
    \u0275\u0275text(17, "0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 30);
    \u0275\u0275listener("click", function Login_Conditional_10_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backspace());
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "backspace");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(21, Login_Conditional_10_Conditional_21_Template, 2, 1, "button", 31);
    \u0275\u0275conditionalCreate(22, Login_Conditional_10_Conditional_22_Template, 2, 0, "button", 32)(23, Login_Conditional_10_Conditional_23_Template, 2, 0, "button", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.codeTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.codeHint);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.infoMessage() ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.codeDots);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(9, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.step() === "enter-code" ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.resetMode() ? 22 : 23);
  }
}
var CODE_LENGTH = 6;
var LAST_EMAIL_KEY = "note-course.lastEmail";
var Login = class _Login {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  auth;
  router;
  step = signal(
    "email",
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  email = "";
  code = signal(
    "",
    ...ngDevMode ? [{ debugName: "code" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Dernier email utilisé, mémorisé localement pour éviter de le retaper à
  // chaque ouverture de l'app ; "Changer de compte" repasse en saisie libre.
  savedEmail = signal(
    localStorage.getItem(LAST_EMAIL_KEY),
    ...ngDevMode ? [{ debugName: "savedEmail" }] : (
      /* istanbul ignore next */
      []
    )
  );
  useSavedAccount = signal(
    this.savedEmail() !== null,
    ...ngDevMode ? [{ debugName: "useSavedAccount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // true quand l'utilisateur vient de se connecter avec le code provisoire
  // ("code oublié") et doit obligatoirement en définir un nouveau.
  resetMode = signal(
    false,
    ...ngDevMode ? [{ debugName: "resetMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingNewCode = "";
  loading = signal(
    false,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  errorMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  infoMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "infoMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  codeDots = Array.from({ length: CODE_LENGTH });
  ngOnInit() {
    const user = this.auth.user();
    if (user?.mustResetCode) {
      this.email = user.email;
      this.resetMode.set(true);
      this.step.set("create-code");
    }
  }
  get emailValid() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  }
  get codeTitle() {
    switch (this.step()) {
      case "create-code":
        return this.resetMode() ? "D\xE9finissez un nouveau code" : "Cr\xE9ez votre code";
      case "confirm-code":
        return this.resetMode() ? "Confirmez le nouveau code" : "Confirmez votre code";
      default:
        return "Entrez votre code";
    }
  }
  get codeHint() {
    if (this.step() === "create-code") {
      return this.resetMode() ? "Ce nouveau code \xE0 6 chiffres remplacera le code provisoire." : "Ce code \xE0 6 chiffres vous servira \xE0 vous connecter.";
    }
    if (this.step() === "confirm-code") {
      return "Ressaisissez le m\xEAme code.";
    }
    return "Bon retour !";
  }
  continueWithSavedEmail() {
    const email = this.savedEmail();
    if (!email)
      return;
    this.email = email;
    this.submitEmail();
  }
  switchAccount() {
    this.useSavedAccount.set(false);
    this.email = "";
    this.errorMessage.set("");
  }
  submitEmail() {
    if (!this.emailValid || this.loading())
      return;
    this.loading.set(true);
    this.errorMessage.set("");
    this.infoMessage.set("");
    const email = this.email.trim();
    this.auth.checkEmail(email).subscribe({
      next: ({ exists }) => {
        this.loading.set(false);
        this.code.set("");
        this.rememberEmail(email);
        this.step.set(exists ? "enter-code" : "create-code");
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set("Impossible de v\xE9rifier cet email pour le moment.");
      }
    });
  }
  rememberEmail(email) {
    localStorage.setItem(LAST_EMAIL_KEY, email);
    this.savedEmail.set(email);
  }
  backToEmail() {
    if (this.resetMode()) {
      this.auth.logout();
    }
    this.resetMode.set(false);
    this.step.set("email");
    this.code.set("");
    this.errorMessage.set("");
    this.infoMessage.set("");
  }
  tapDigit(digit) {
    if (this.code().length >= CODE_LENGTH || this.loading())
      return;
    this.errorMessage.set("");
    this.code.set(this.code() + digit);
    if (this.code().length === CODE_LENGTH) {
      this.onCodeComplete();
    }
  }
  backspace() {
    this.code.set(this.code().slice(0, -1));
  }
  onCodeComplete() {
    const step = this.step();
    if (step === "create-code") {
      this.pendingNewCode = this.code();
      this.code.set("");
      this.step.set("confirm-code");
    } else if (step === "confirm-code") {
      if (this.code() === this.pendingNewCode) {
        if (this.resetMode()) {
          this.finishSetCode(this.pendingNewCode);
        } else {
          this.finishRegister(this.pendingNewCode);
        }
      } else {
        this.errorMessage.set("Les deux codes ne correspondent pas, recommencez.");
        this.pendingNewCode = "";
        this.code.set("");
        this.step.set("create-code");
      }
    } else if (step === "enter-code") {
      this.submitLogin();
    }
  }
  finishRegister(code) {
    this.loading.set(true);
    this.auth.register(this.email.trim(), code).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.code.set("");
        this.step.set("create-code");
        this.errorMessage.set(err.status === 409 ? "Un compte existe d\xE9j\xE0 avec cet email." : "Impossible de cr\xE9er le compte pour le moment.");
      }
    });
  }
  finishSetCode(code) {
    this.loading.set(true);
    this.auth.setCode(code).subscribe({
      next: () => {
        this.loading.set(false);
        this.resetMode.set(false);
        this.router.navigate(["/home"]);
      },
      error: () => {
        this.loading.set(false);
        this.code.set("");
        this.step.set("create-code");
        this.errorMessage.set("Impossible d'enregistrer le nouveau code pour le moment.");
      }
    });
  }
  submitLogin() {
    this.loading.set(true);
    this.auth.login(this.email.trim(), this.code()).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.user.mustResetCode) {
          this.resetMode.set(true);
          this.code.set("");
          this.errorMessage.set("");
          this.infoMessage.set("");
          this.step.set("create-code");
          return;
        }
        this.router.navigate(["/home"]);
      },
      error: () => {
        this.loading.set(false);
        this.code.set("");
        this.errorMessage.set("Code incorrect.");
      }
    });
  }
  forgotCode() {
    if (this.loading())
      return;
    this.loading.set(true);
    this.errorMessage.set("");
    this.infoMessage.set("");
    this.auth.forgotCode(this.email.trim()).subscribe({
      next: () => {
        this.loading.set(false);
        this.code.set("");
        this.infoMessage.set("Un code provisoire a \xE9t\xE9 d\xE9fini pour ce compte. Entrez-le pour continuer.");
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set("Impossible de r\xE9initialiser le code pour cet email.");
      }
    });
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], decls: 11, vars: 1, consts: [["emailInput", ""], [1, "login-screen"], [1, "login-screen__top"], [1, "brand"], [1, "brand__icon"], [1, "code-screen"], [1, "login-form"], [1, "account-card"], [1, "account-card__avatar"], [1, "account-card__email"], [1, "error"], ["type", "button", 1, "submit-btn", "tap-target", 3, "click", "disabled"], [1, "spinner"], ["type", "button", 1, "link-btn", "link-btn--muted", "tap-target", 3, "click"], [1, "login-form", 3, "ngSubmit"], [1, "field"], [1, "field__label"], [1, "field__input-wrap"], ["type", "email", "name", "email", "required", "", "autocomplete", "username", "inputmode", "email", 1, "field__input", "field__input--clearable", 3, "ngModelChange", "ngModel"], ["type", "button", "aria-label", "Effacer l'email", 1, "input-clear-btn", "tap-target"], ["type", "submit", 1, "submit-btn", "tap-target", 3, "disabled"], ["type", "button", "aria-label", "Effacer l'email", 1, "input-clear-btn", "tap-target", 3, "click"], [1, "code-screen__email"], [1, "code-screen__hint"], [1, "info"], [1, "code-dots"], [1, "code-dot", 3, "code-dot--filled"], [1, "keypad"], [1, "keypad__key", "tap-target", 3, "disabled"], [1, "keypad__key", "tap-target", 3, "click", "disabled"], ["aria-label", "Effacer", 1, "keypad__key", "keypad__key--ghost", "tap-target", 3, "click", "disabled"], [1, "link-btn", "tap-target", 3, "disabled"], [1, "link-btn", "link-btn--muted", "tap-target"], [1, "code-dot"], [1, "link-btn", "tap-target", 3, "click", "disabled"], [1, "link-btn", "link-btn--muted", "tap-target", 3, "click"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
      \u0275\u0275text(4, "\u{1F33F}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1");
      \u0275\u0275text(6, "Mes Courses");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Vos listes de courses, simples et sereines.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(9, Login_Conditional_9_Template, 2, 1)(10, Login_Conditional_10_Template, 24, 10, "div", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.step() === "email" ? 9 : 10);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, MatIconModule, MatIcon], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background:\n    radial-gradient(\n      circle at 25% 15%,\n      #e3f0e6 0%,\n      transparent 45%),\n    radial-gradient(\n      circle at 85% 75%,\n      #dcecf2 0%,\n      transparent 50%),\n    linear-gradient(\n      180deg,\n      #f5faf6 0%,\n      #eef5f1 100%);\n  padding-top: var(--%NS%safe-top);\n  padding-bottom: var(--%NS%safe-bottom);\n  overflow-y: auto;\n}\n.login-screen[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n}\n.login-screen__top[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 24px 0;\n  min-height: 140px;\n}\n.brand[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.brand[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 6px 0 4px;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 700;\n  font-size: 30px;\n  color: #3f6b52;\n}\n.brand[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #6b8577;\n  font-size: 14px;\n}\n.brand__icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n}\n.login-form[_ngcontent-%COMP%] {\n  padding: 16px 24px calc(28px + var(--%NS%safe-bottom, 0px));\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #5c7c6a;\n  padding-left: 2px;\n}\n.field__input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.field__input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1.5px solid #dce9e0;\n  border-radius: 14px;\n  padding: 14px 40px 14px 16px;\n  font-size: 16px;\n  font-family: inherit;\n  color: #33503f;\n  background: rgba(255, 255, 255, 0.8);\n}\n.field__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #7fb996;\n  background: #fff;\n}\n.account-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  padding: 22px 16px;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1.5px solid #dce9e0;\n  border-radius: 18px;\n}\n.account-card__avatar[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: #cfe6d7;\n  color: #3f6b52;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 700;\n  font-size: 22px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.account-card__email[_ngcontent-%COMP%] {\n  margin: 0;\n  font-weight: 600;\n  color: #33503f;\n  font-size: 15px;\n  word-break: break-all;\n  text-align: center;\n}\n.error[_ngcontent-%COMP%] {\n  color: #b3413a;\n  background: #fbe9e7;\n  border-radius: 10px;\n  padding: 10px 14px;\n  font-size: 13px;\n  margin: 0;\n  text-align: center;\n}\n.info[_ngcontent-%COMP%] {\n  color: #3f6b52;\n  background: #e5f4e8;\n  border-radius: 10px;\n  padding: 10px 14px;\n  font-size: 13px;\n  margin: 0;\n  text-align: center;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  height: 52px;\n  border: none;\n  border-radius: 16px;\n  background: #4f8865;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 700;\n  font-family: inherit;\n  margin-top: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 10px 24px rgba(63, 107, 82, 0.28);\n}\n.submit-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  background: #c4d8cc;\n  box-shadow: none;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 2.5px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #fff;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.hint[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  text-align: center;\n  font-size: 12px;\n  color: #93a89c;\n}\n.code-screen[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 8px 24px calc(28px + var(--%NS%safe-bottom, 0px));\n  gap: 14px;\n  text-align: center;\n}\n.code-screen__email[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: #8ba397;\n  font-weight: 600;\n}\n.code-screen[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 700;\n  font-size: 21px;\n  color: #3f6b52;\n}\n.code-screen__hint[_ngcontent-%COMP%] {\n  margin: -6px 0 0;\n  font-size: 13px;\n  color: #6b8577;\n}\n.code-dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin: 4px 0;\n}\n.code-dot[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  border: 2px solid #a9c9b5;\n  background: transparent;\n  transition: background 0.15s ease;\n}\n.code-dot--filled[_ngcontent-%COMP%] {\n  background: #4f8865;\n  border-color: #4f8865;\n}\n.keypad[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 14px;\n  width: 100%;\n  max-width: 300px;\n}\n.keypad__key[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  border-radius: 50%;\n  border: none;\n  background: rgba(255, 255, 255, 0.8);\n  color: #33503f;\n  font-size: 22px;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(63, 107, 82, 0.08);\n}\n.keypad__key[_ngcontent-%COMP%]:active {\n  background: #e3f0e6;\n}\n.keypad__key[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n}\n.keypad__key--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  box-shadow: none;\n  color: #6b8577;\n}\n.link-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #4f7a63;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: underline;\n  padding: 6px;\n}\n.link-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.link-btn--muted[_ngcontent-%COMP%] {\n  color: #93a89c;\n  font-weight: 500;\n  font-size: 13px;\n  text-decoration: none;\n}\n/*# sourceMappingURL=login.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", imports: [FormsModule, MatIconModule], template: `<div class="login-screen">
  <div class="login-screen__top">
    <div class="brand">
      <span class="brand__icon">\u{1F33F}</span>
      <h1>Mes Courses</h1>
      <p>Vos listes de courses, simples et sereines.</p>
    </div>
  </div>

  @if (step() === 'email') {
    @if (useSavedAccount() && savedEmail(); as recognizedEmail) {
      <div class="login-form">
        <div class="account-card">
          <div class="account-card__avatar">{{ recognizedEmail.charAt(0).toUpperCase() }}</div>
          <p class="account-card__email">{{ recognizedEmail }}</p>
        </div>

        @if (errorMessage()) {
          <p class="error">{{ errorMessage() }}</p>
        }

        <button
          type="button"
          class="submit-btn tap-target"
          [disabled]="loading()"
          (click)="continueWithSavedEmail()"
        >
          @if (loading()) {
            <span class="spinner"></span>
          } @else {
            <span>Continuer</span>
          }
        </button>

        <button type="button" class="link-btn link-btn--muted tap-target" (click)="switchAccount()">
          Changer de compte
        </button>
      </div>
    } @else {
      <form class="login-form" (ngSubmit)="submitEmail()">
        <label class="field">
          <span class="field__label">Email</span>
          <div class="field__input-wrap">
            <input
              #emailInput
              class="field__input field__input--clearable"
              type="email"
              name="email"
              [(ngModel)]="email"
              required
              autocomplete="username"
              inputmode="email"
            />
            @if (email) {
              <button
                type="button"
                class="input-clear-btn tap-target"
                (click)="email = ''; emailInput.focus()"
                aria-label="Effacer l'email"
              >
                <mat-icon>close</mat-icon>
              </button>
            }
          </div>
        </label>

        @if (errorMessage()) {
          <p class="error">{{ errorMessage() }}</p>
        }

        <button type="submit" class="submit-btn tap-target" [disabled]="!emailValid || loading()">
          @if (loading()) {
            <span class="spinner"></span>
          } @else {
            <span>Continuer</span>
          }
        </button>
      </form>
    }
  } @else {
    <div class="code-screen">
      <p class="code-screen__email">{{ email }}</p>

      <h2>{{ codeTitle }}</h2>
      <p class="code-screen__hint">{{ codeHint }}</p>

      @if (errorMessage()) {
        <p class="error">{{ errorMessage() }}</p>
      }
      @if (infoMessage()) {
        <p class="info">{{ infoMessage() }}</p>
      }

      <div class="code-dots">
        @for (dot of codeDots; track $index) {
          <span class="code-dot" [class.code-dot--filled]="$index < code().length"></span>
        }
      </div>

      <div class="keypad">
        @for (digit of ['1', '2', '3', '4', '5', '6', '7', '8', '9']; track digit) {
          <button class="keypad__key tap-target" [disabled]="loading()" (click)="tapDigit(digit)">
            {{ digit }}
          </button>
        }
        <span></span>
        <button class="keypad__key tap-target" [disabled]="loading()" (click)="tapDigit('0')">0</button>
        <button
          class="keypad__key keypad__key--ghost tap-target"
          [disabled]="loading()"
          (click)="backspace()"
          aria-label="Effacer"
        >
          <mat-icon>backspace</mat-icon>
        </button>
      </div>

      @if (step() === 'enter-code') {
        <button class="link-btn tap-target" [disabled]="loading()" (click)="forgotCode()">
          Code oubli\xE9 ?
        </button>
      }

      @if (!resetMode()) {
        <button class="link-btn link-btn--muted tap-target" (click)="backToEmail()">
          Changer d'email
        </button>
      } @else {
        <button class="link-btn link-btn--muted tap-target" (click)="backToEmail()">
          Annuler
        </button>
      }
    </div>
  }
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/features/login/login.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background:\n    radial-gradient(\n      circle at 25% 15%,\n      #e3f0e6 0%,\n      transparent 45%),\n    radial-gradient(\n      circle at 85% 75%,\n      #dcecf2 0%,\n      transparent 50%),\n    linear-gradient(\n      180deg,\n      #f5faf6 0%,\n      #eef5f1 100%);\n  padding-top: var(--safe-top);\n  padding-bottom: var(--safe-bottom);\n  overflow-y: auto;\n}\n.login-screen {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n}\n.login-screen__top {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 24px 0;\n  min-height: 140px;\n}\n.brand {\n  text-align: center;\n}\n.brand h1 {\n  margin: 6px 0 4px;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 700;\n  font-size: 30px;\n  color: #3f6b52;\n}\n.brand p {\n  margin: 0;\n  color: #6b8577;\n  font-size: 14px;\n}\n.brand__icon {\n  font-size: 48px;\n}\n.login-form {\n  padding: 16px 24px calc(28px + var(--safe-bottom, 0px));\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field__label {\n  font-size: 13px;\n  font-weight: 600;\n  color: #5c7c6a;\n  padding-left: 2px;\n}\n.field__input-wrap {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.field__input {\n  width: 100%;\n  border: 1.5px solid #dce9e0;\n  border-radius: 14px;\n  padding: 14px 40px 14px 16px;\n  font-size: 16px;\n  font-family: inherit;\n  color: #33503f;\n  background: rgba(255, 255, 255, 0.8);\n}\n.field__input:focus {\n  outline: none;\n  border-color: #7fb996;\n  background: #fff;\n}\n.account-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  padding: 22px 16px;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1.5px solid #dce9e0;\n  border-radius: 18px;\n}\n.account-card__avatar {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: #cfe6d7;\n  color: #3f6b52;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 700;\n  font-size: 22px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.account-card__email {\n  margin: 0;\n  font-weight: 600;\n  color: #33503f;\n  font-size: 15px;\n  word-break: break-all;\n  text-align: center;\n}\n.error {\n  color: #b3413a;\n  background: #fbe9e7;\n  border-radius: 10px;\n  padding: 10px 14px;\n  font-size: 13px;\n  margin: 0;\n  text-align: center;\n}\n.info {\n  color: #3f6b52;\n  background: #e5f4e8;\n  border-radius: 10px;\n  padding: 10px 14px;\n  font-size: 13px;\n  margin: 0;\n  text-align: center;\n}\n.submit-btn {\n  height: 52px;\n  border: none;\n  border-radius: 16px;\n  background: #4f8865;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 700;\n  font-family: inherit;\n  margin-top: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 10px 24px rgba(63, 107, 82, 0.28);\n}\n.submit-btn:active {\n  transform: scale(0.98);\n}\n.submit-btn:disabled {\n  background: #c4d8cc;\n  box-shadow: none;\n  cursor: not-allowed;\n}\n.spinner {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 2.5px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #fff;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.hint {\n  margin-top: 6px;\n  text-align: center;\n  font-size: 12px;\n  color: #93a89c;\n}\n.code-screen {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 8px 24px calc(28px + var(--safe-bottom, 0px));\n  gap: 14px;\n  text-align: center;\n}\n.code-screen__email {\n  margin: 0;\n  font-size: 13px;\n  color: #8ba397;\n  font-weight: 600;\n}\n.code-screen h2 {\n  margin: 0;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 700;\n  font-size: 21px;\n  color: #3f6b52;\n}\n.code-screen__hint {\n  margin: -6px 0 0;\n  font-size: 13px;\n  color: #6b8577;\n}\n.code-dots {\n  display: flex;\n  gap: 12px;\n  margin: 4px 0;\n}\n.code-dot {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  border: 2px solid #a9c9b5;\n  background: transparent;\n  transition: background 0.15s ease;\n}\n.code-dot--filled {\n  background: #4f8865;\n  border-color: #4f8865;\n}\n.keypad {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 14px;\n  width: 100%;\n  max-width: 300px;\n}\n.keypad__key {\n  aspect-ratio: 1;\n  border-radius: 50%;\n  border: none;\n  background: rgba(255, 255, 255, 0.8);\n  color: #33503f;\n  font-size: 22px;\n  font-family: "Quicksand", sans-serif;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(63, 107, 82, 0.08);\n}\n.keypad__key:active {\n  background: #e3f0e6;\n}\n.keypad__key:disabled {\n  opacity: 0.5;\n}\n.keypad__key--ghost {\n  background: transparent;\n  box-shadow: none;\n  color: #6b8577;\n}\n.link-btn {\n  border: none;\n  background: transparent;\n  color: #4f7a63;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: underline;\n  padding: 6px;\n}\n.link-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.link-btn--muted {\n  color: #93a89c;\n  font-weight: 500;\n  font-size: 13px;\n  text-decoration: none;\n}\n/*# sourceMappingURL=login.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/app/features/login/login.ts", lineNumber: 18 });
})();
export {
  Login
};
//# debugId=2f20f12e-f8f1-52c6-9a24-226200a8a4ed
//# sourceMappingURL=chunk-JTYFDNH6.js.map
