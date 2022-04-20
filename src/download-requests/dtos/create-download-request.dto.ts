import { IsNotEmpty } from "class-validator";

export class CreateDownloadRequestDto {
    @IsNotEmpty({ message: "Resource is required" })
    readonly resource: string;

    readonly pluginsSourceCode?: boolean;
}