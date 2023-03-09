import { Component } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  public mediaHtml = [];
  public youTubeVideosIds = [
    'ix-QW-BShPY',
    'Fi3ZiJ29pwI',
    'C7HL5wYqAbU',
    'LTRFwojjifg',
    'FqJdzYY_Fas',
    'acO_0Ly74G0',
    'k3mNFdE2syM'
  ];

  public ngOnInit() {
    //composeMediaHtml()
  }
}
