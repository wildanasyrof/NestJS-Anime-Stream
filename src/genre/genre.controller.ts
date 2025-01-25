import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { WebResponse } from "src/model/web.model";
import { CreateGenreRequest, GenreResponse } from "src/model/genre.model";

@Controller("genre")
export class GenreController {
    constructor(
        private readonly genreService: GenreService
    ) {}

    @Post()
    async create(@Body() request: CreateGenreRequest): Promise<WebResponse<GenreResponse>> {
        const result = await this.genreService.create(request);
        return {
            status: "success",
            message: "Genre created successfully",
            data: result,
        }
    }

    @Get()
    async get(): Promise<WebResponse<GenreResponse[]>> {
        const result = await this.genreService.get();
        return {
            status: "success",
            message: "Get all genre",
            data: result,
        }
    }

    @Delete(':id')
    async destroy(@Param('id') id: string): Promise<WebResponse<GenreResponse>> {
        const result = await this.genreService.destroy(parseInt(id));
        return {
            status: "success",
            message: "Genre deleted successfully",
            data: result,
        }
    }
}