require('es6-symbol/implement');

import { Textbox } from "./textbox/textbox";
import { Ripple } from "./ripple/ripple";
import { Button } from "./button/button";
import { ButtonComponent } from "./button/button.component";
import { RippleComponent } from "./ripple/ripple.component";
import { TextboxComponent } from "./textbox/textbox.component";
import { DialogComponent } from "./dialog/dialog.component";
import { Dialog } from "./dialog/dialog";
import { ProgressBar } from "./progress-bar/progress-bar";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { Tooltip } from "./tooltip/tooltip";
import { TooltipComponent } from "./tooltip/tooltip.component";

export { Textbox as Textbox, TextboxComponent }
export { Ripple as Ripple, RippleComponent }
export { Button as Button, ButtonComponent }
export { Dialog as Dialog, DialogComponent }
export { ProgressBar as ProgressBar, ProgressBarComponent }
export { Tooltip as Tooltip, TooltipComponent }