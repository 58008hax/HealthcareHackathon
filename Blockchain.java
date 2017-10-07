import java.util.*;
import java.io.*;

public class Blockchain{
    ArrayList<ArrayList<Block>> chainMaster = new ArrayList<ArrayList<Block>>();
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

    //get the index of the longest instance of the chain
    public int getLongestChain(){
        int longest = 0;
        int longestIndex = -1;
        for (int i = 0; i < chainMaster.size(); i++){
            if(chainMaster.get(i).size() > longest){
                longest = chainMaster.get(i).size();
                longestIndex = i;
            }
        }
        return longestIndex;
    }

    public Block getBlock(int n){
        return chainMaster.get(getLongestChain()).get(n);
    }
}