import { Request, Response } from "express";
import{vendedorService} from "../services/vendedorService" //criar o service junto com nota fiscal

export class vendedorController{
    private vendedorService: vendedorService = new vendedorService(); //criar vendedorService, não esquecer
 
}