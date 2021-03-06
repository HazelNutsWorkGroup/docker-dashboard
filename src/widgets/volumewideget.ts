import { Widget } from "./widget";
import { WidgetRender } from "../common/widgetrender";
import { Dockerode } from "../common/docker/dockerode";
import { Log } from "../common/log";
import { injectable } from "inversify";

@injectable()
export class VolumeWidget extends Widget {
    private volumeTable: any;

    getCommandName(): string {
        return "Volumes";
    }

    getCommandKey(): { [key: string]: any } {
        return {
            keys: ["v"],
            callback: () => {
                if (!this.volumeTable) {
                    this.render();
                }
                this.active();
            }
        };
    }

    public getAllElements(): Array<any> {
        return [this.volumeTable];
    }

    protected async renderWidget(box: any) {
        try {
            this.volumeTable = WidgetRender.table(box, 0, 0, "100%-2", "100%-2", "");
            const data = await Dockerode.singleton.listVolumes();
            this.volumeTable.setData(data);
        } catch (error) {
            Log.error(error);
        }
    }
}