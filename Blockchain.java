import java.util.*;
import java.io.*;

public class Blockchain{
    ArrayList<Block> chain;

    //to create a new chain of blocks for a new patient with a genesis block
    public Blockchain(){
        this.chain = new ArrayList<Block>();
        Date date = new Date();
        Block genBlock = new Block(0, "0", date, "genesis block", "god");
        this.chain.add(genBlock);
    }

    public void addBlock(Block block){
        this.chain.add(block);
    }

    public Block getBlock(int n){
        return chain.get(n);
    }
}