import { Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/utils/guards/AuthGuard";

@Controller('/projects')
@ApiTags('Projects')
@UseGuards(AuthGuard)
export class ProjectsController {

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  async getProjects() {

  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get specific project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  async getProject(
    @Param('id') id: string
  ) {

  }

  @Post('/:id')
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  async createProject(
    @Param('id') id: string
  ) {}

  @Put('/:id')
  @ApiOperation({ summary: 'Edit a project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  async editProject(
    @Param('id') id: string
  ) { }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 204, description: "Project deleted"})
  async deleteProject(
    @Param('id') id: string
  ) { }
}