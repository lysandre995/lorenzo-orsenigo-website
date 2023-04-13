import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;

  it('should be created', async () => {
    service = new EventsService();
    await service.loadEventsSummaryAndSetFirstPastEventIndex();
    const cEvents = await service.getCurrentEvents();
    const pEvents = await service.getPastEvents(0);
    console.log(cEvents);
    console.log(pEvents);
  });
});
