import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from "@angular/core";
import 'jquery';
import 'bootstrap-switch';

@Component({
    selector: 'bootstrap-switch',
    templateUrl: `app/switch/bootstrap-switch.component.html`,
    styleUrls: ['app/switch/bootstrap-switch.component.css']
})
export class BootstrapSwitchComponent implements OnInit, OnChanges {
    @Input() value: boolean;
    @Input() switchId: string;
    @Input() title: string;
    @Input() disabledCondition: boolean;
    @Input() size: string;
    @Input() textRight: boolean;
    @Output() switchChange = new EventEmitter();
    @Input() isOnOff: boolean = false;

    ngOnInit() {
        var listener = () => {
            let size = window.matchMedia("(max-width: 992px)").matches ? "normal" : "large";
            size = window.matchMedia("(max-width: 600px").matches ? "small" : size;
            $('#' + this.switchId).bootstrapSwitch('size', size);
        };
        window.addEventListener('resize', listener);
        window.dispatchEvent(new Event('resize'));

        if (this.size) {
            window.removeEventListener('resize', listener)
        }
    }


    ngOnChanges(changes) {
        setTimeout(() => {
            $('#' + this.switchId).bootstrapSwitch();
            if (this.isOnOff) {
                $('#' + this.switchId).bootstrapSwitch('onText', 'ON');
                $('#' + this.switchId).bootstrapSwitch('offText', 'OFF');
            } else {
                $('#' + this.switchId).bootstrapSwitch('onText', 'YES');
                $('#' + this.switchId).bootstrapSwitch('offText', 'NO');
            }
            $('#' + this.switchId).bootstrapSwitch('state', this.value);
            $('#' + this.switchId).bootstrapSwitch('disabled', this.disabledCondition);
            if (this.size) {
                $('#' + this.switchId).bootstrapSwitch('size', this.size);
            }

            var self = this;
            $('#' + this.switchId).off('switchChange.bootstrapSwitch');
            $('#' + this.switchId).one('switchChange.bootstrapSwitch', function (event, state) {
                self.value = state;
                self.switchChange.emit(state);
            });
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }
}
